import { makeStyles } from '@material-ui/styles';
import { Button, TextField, Avatar } from '@mui/material';
import React, { useState, useContext } from 'react';
import { rootContext } from '../rootContent';
import { TEmployee } from '../../types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CreateIcon from '@mui/icons-material/Create';

const useStyles = makeStyles(() => ({
  birthdaySection: {},
  btnGroup: {
    marginBottom: '40px',
    '&>button:first-child': {
      marginRight: '16px',
    },
  },
  InfoList: {
    display: 'flex',
  },
  InfoListItem: {
    cursor: 'pointer',
    marginRight: '16px',
    display: 'flex',

    '&:hover': {
      '& .iconWrapper': {
        visibility: 'visible',
        opacity: 1,
      },
    },

    '& .iconWrapper': {
      marginLeft: '8px',
      visibility: 'hidden',
      opacity: 0,
      display: 'flex',
      flexDirection: 'column',

      '& .icon svg': {
        fontSize: '20px',
      },
    },
  },
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
  },
}));

const BirthdaySection = () => {
  const classes = useStyles();
  const root = useContext(rootContext);
  const [staff, setStaff] = useState<TEmployee[]>([]);

  const handleAddEmployee = () => {
    const { openDialog } = root;

    openDialog({
      title: 'Add New Birthday Hero',
      component: (
        <DialogComponent
          staff={staff}
          setStaff={setStaff}
          root={root}
          classes={classes}
        />
      ),
    });
  };

  const handleModify = (
    e: React.MouseEvent<HTMLSpanElement>,
    person: TEmployee,
    index: number
  ) => {
    const { openDialog } = root;

    openDialog({
      title: 'Add New Birthday Hero',
      component: (
        <DialogComponent
          staff={staff}
          setStaff={setStaff}
          root={root}
          modifyInfo={person}
          index={index}
          classes={classes}
        />
      ),
    });
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLSpanElement>,
    index: number
  ) => {
    console.log('index--', index);
    let templist = [...staff];
    templist.splice(index, 1);
    setStaff(templist);
    root.setBirthdayPerson(templist);
  };

  return (
    <div className={classes.birthdaySection}>
      <div className={classes.btnGroup}>
        <Button
          variant="contained"
          onClick={handleAddEmployee}
          endIcon={<AddCircleOutlineIcon />}
        >
          Add
        </Button>
      </div>
      <div className="">
        <ul className={classes.InfoList}>
          {staff.map((person, index) => (
            <li key={person.name} className={classes.InfoListItem}>
              <Avatar alt={person.name} src={person.avatar} />
              <div className="iconWrapper">
                <span className="icon" onClick={e => handleDelete(e, index)}>
                  <HighlightOffIcon />
                </span>
                <span
                  className="icon"
                  onClick={e => handleModify(e, person, index)}
                >
                  <CreateIcon />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BirthdaySection;

const DialogComponent: React.FC<any> = ({
  staff,
  setStaff,
  root,
  modifyInfo = null,
  index = null,
  classes,
}) => {
  const [currentEmployee, setCurrentEmployee] = useState<TEmployee>(
    modifyInfo
      ? modifyInfo
      : {
          avatar: '',
          name: '',
          heroName: '',
          officePost: '',
          jobTitle: '',
          birthDate: '',
        }
  );

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
    if (
      Object.entries(currentEmployee).some(
        i => i[0] !== 'jobTitle' && i[1].toString().trim() === ''
      )
    ) {
      alert('please fill in current information');
      return;
    }
    const { closeDialog } = root;
    let templist = staff;

    if (modifyInfo) {
      templist.splice(index, 1, currentEmployee);
    } else {
      templist = templist.concat(currentEmployee);
    }
    setStaff(templist);
    root.setBirthdayPerson(templist);
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
          label="Birth Date"
          fullWidth={true}
          value={currentEmployee.birthDate}
          onChange={e => handleInputInfo(e, 'birthDate')}
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
