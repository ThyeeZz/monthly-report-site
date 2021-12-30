import { makeStyles } from '@mui/styles';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { TEmployee } from '../../../types';

const useStyles = makeStyles(() => ({
  dialogContent: {
    '& img': {
      maxWidth: '150px',
    },
  },
  fileUploader: {
    marginBottom: '24px',
  },
  inputWrapper: {
    '&>div': {
      marginBottom: '24px',
    },

    '& .confirmBtn': {
      boxShadow: 'none !important',
    },
  },
}));

const DialogComponent: React.FC<any> = ({
  staff,
  setStaff,
  root,
  modifyInfo = null,
  index = null,
}) => {
  const classes = useStyles();
  const [currentEmployee, setCurrentEmployee] = useState<TEmployee>(
    modifyInfo
      ? modifyInfo
      : {
          avatar: '',
          name: '',
          heroName: '',
          officePost: '',
          jobTitle: '',
          anniversary: '',
        }
  );
  const [errorPrompt, setErrorPrompt] = useState({
    showError: false,
    errorMsg: '',
  });

  const handleUploadAva = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const url = URL.createObjectURL(file);
    setCurrentEmployee(v => ({
      ...v,
      avatar: url,
    }));
  };
  const handleInputInfo = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: string
  ) => {
    const { value } = e.target;
    setCurrentEmployee(v => ({
      ...v,
      [key]: value,
    }));
  };
  const handleConfirm = () => {
    // if (
    //   Object.entries(currentEmployee).some(
    //     i => i[0] !== 'jobTitle' && i[1].toString().trim() === ''
    //   )
    // ) {
    //   alert('Please complete the information');
    //   return;
    // }

    // if (Number(currentEmployee.anniversary)) {
    //   setErrorPrompt({
    //     showError: true,
    //     errorMsg: 'Please enter the Chinese anniversary number!',
    //   });
    //   return;
    // }
    const { closeDialog } = root;
    let templist = staff;

    if (modifyInfo) {
      templist.splice(index, 1, currentEmployee);
    } else {
      templist = templist.concat(currentEmployee);
    }
    setStaff(templist);
    root.setReportData((v: any) => ({
      ...v,
      anniversaryPerson: templist,
    }));
    closeDialog();
  };
  // console.log('currentEmployee---', currentEmployee);
  return (
    <div className={classes.dialogContent}>
      <div className={classes.fileUploader}>
        <input type="file" onChange={handleUploadAva} />
        {currentEmployee.avatar && (
          <img src={currentEmployee.avatar} alt="Hero Avatar" />
        )}
      </div>

      <div className={classes.inputWrapper}>
        <TextField
          label="Name"
          fullWidth={true}
          value={currentEmployee.name}
          onChange={e => handleInputInfo(e, 'name')}
        />
        <TextField
          label="Hero Name"
          fullWidth={true}
          value={currentEmployee.heroName}
          onChange={e => handleInputInfo(e, 'heroName')}
        />
        <TextField
          label="Office Post"
          multiline
          fullWidth={true}
          value={currentEmployee.officePost}
          onChange={e => handleInputInfo(e, 'officePost')}
        />
        <TextField
          label="Job Title(optional)"
          fullWidth={true}
          value={currentEmployee.jobTitle}
          onChange={e => handleInputInfo(e, 'jobTitle')}
        />
        <TextField
          label="Anniversary Number"
          fullWidth={true}
          value={currentEmployee.birthDate}
          onChange={e => handleInputInfo(e, 'anniversary')}
          error={errorPrompt.showError}
          helperText={errorPrompt.errorMsg}
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
