import { makeStyles } from '@material-ui/styles';
import { Button, Avatar } from '@mui/material';
import React, { useState, useContext } from 'react';
import { rootContext } from '../rootContent';
import { TEmployee } from '../../types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CreateIcon from '@mui/icons-material/Create';
import BirthdayComponent from '../dalogContentComp/birthdayContent';
import AnnversaryComponent from '../dalogContentComp/anniversaryContent';
import NewHeroComponent from '../dalogContentComp/newHeroContent';

const useStyles = makeStyles(() => ({
  birthdaySection: {},
  btnGroup: {
    marginBottom: '40px',
    '&>button:first-child': {
      marginRight: '16px',
      boxShadow: 'none !iportant',
    },
  },
  InfoList: {
    display: 'flex',
    overflowX: 'auto',
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
}));

const componentMap = {
  birthday: BirthdayComponent,
  anniversary: AnnversaryComponent,
  newHero: NewHeroComponent,
};

type TKey = 'birthday' | 'anniversary' | 'newHero';

const EditSection: React.FC<{ keyWord: TKey }> = ({
  keyWord = 'birdthday',
}) => {
  const classes = useStyles();
  const root = useContext(rootContext);
  const [staff, setStaff] = useState<TEmployee[]>([]);

  const DialogComponent = componentMap[keyWord as TKey];

  const handleAddEmployee = () => {
    const { openDialog } = root;

    openDialog({
      title: 'Add New Birthday Hero',
      component: (
        <DialogComponent staff={staff} setStaff={setStaff} root={root} />
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
        />
      ),
    });
  };

  const NoData = () => {
    return (
      <div
        style={{
          fontSize: '24px',
          lineHeight: '32px',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        No Data
      </div>
    );
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLSpanElement>,
    index: number
  ) => {
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
          {!staff.length ? (
            <NoData />
          ) : (
            staff.map((person, index) => (
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
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default EditSection;
