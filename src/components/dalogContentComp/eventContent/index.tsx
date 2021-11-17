import { makeStyles } from '@material-ui/styles';
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const useStyles = makeStyles(() => ({
  dialogContent: {
    minWidth: '450px',
    '& img': {
      maxWidth: '150px',
    },
  },
  fileUploader: {
    marginBottom: '24px',
  },
  inputWrapper: {
    padding: '24px 0',
    '&>div': {
      marginBottom: '24px',
    },
  },
}));

const DialogComponent: React.FC<any> = ({
  events,
  setEvents,
  root,
  modifyInfo = null,
  index = null,
}) => {
  const classes = useStyles();
  const [currentEvent, setCurrentEvent] = useState<{
    value: string;
    showError: boolean;
  }>(
    modifyInfo
      ? modifyInfo
      : {
          value: '',
          showError: false,
        }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentEvent({
      value,
      showError: false,
    });
  };

  const handleConfirm = () => {
    if (currentEvent.value.trim() === '') {
      alert('please fill in current information');
      return;
    }
    const { closeDialog } = root;
    let templist = [...events];
    if (modifyInfo) {
      templist.splice(index, 1, currentEvent);
    } else {
      templist = templist.concat(currentEvent);
    }
    setEvents(templist);
    root.setEvents(templist);
    closeDialog();
  };
  // console.log('currentEmployee---', currentEmployee);
  return (
    <div className={classes.dialogContent}>
      <div className={classes.inputWrapper}>
        <TextField
          label="Event Content"
          multiline
          minRows={3}
          fullWidth={true}
          value={currentEvent.value}
          error={currentEvent.showError}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          onClick={handleConfirm}
          className="confirmBtn"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default DialogComponent;
