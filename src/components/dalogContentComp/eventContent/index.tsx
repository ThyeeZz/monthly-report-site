import { makeStyles } from '@mui/styles';
import { Button, TextField } from '@mui/material';
import React, { useState, useContext, SetStateAction } from 'react';
import { rootContext } from '../../rootContent';
import { TEvent } from '../../../types';

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

type PropType = {
  events: TEvent[];
  setEvents: React.Dispatch<SetStateAction<TEvent[]>>;
  modifyInfo?: { value: string; showError: boolean };
  index?: number;
};

const DialogComponent: React.FC<PropType> = ({
  events,
  setEvents,
  modifyInfo = null,
  index = null,
}) => {
  const classes = useStyles();
  const root = useContext(rootContext);
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
      setCurrentEvent(v => ({
        ...v,
        showError: true,
      }));
      return;
    }
    const { closeDialog } = root;
    let templist = [...events];
    if (modifyInfo) {
      templist.splice(index as number, 1, currentEvent);
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
          helperText={
            currentEvent.showError ? 'Please complete information!' : ''
          }
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
