import { makeStyles } from '@material-ui/styles';
import { Button } from '@mui/material';
import { useState, useContext } from 'react';
import { rootContext } from '../rootContent';
import HighlightOffIcon from '@mui/icons-material/DoDisturbOnOutlined';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TEvent } from '../../types';
import DialogComponent from '../dalogContentComp/eventContent';

type PropType = {
  className?: string;
};

const useStyles = makeStyles(theme => ({
  eventSection: {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '32px',
  },
  btnGroup: {
    marginBottom: '40px',
    '&>button:first-child': {
      marginRight: '16px',
      boxShadow: 'none !important',
    },
  },
  eventsListWrapper: {
    '&>li': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px',

      '&:hover': {
        '& .iconWrapper': {
          visibility: 'visible',
          opacity: 1,
        },
      },
    },

    '& .iconWrapper': {
      fontSize: '20px',
      marginLeft: '16px',
      cursor: 'pointer',
      visibility: 'hidden',
      opacity: 0,

      '& svg': {
        fontSize: '20px',
      },
    },
  },
  text: {
    fontSize: '16px',
    lineHeight: '30px',
    fontWeight: 400,
  },
}));

const EventsSection: React.FC<PropType> = ({ className = '' }) => {
  const classes = useStyles();
  const root = useContext(rootContext);

  const [events, setEvents] = useState<TEvent[]>([]);

  // const handleUpdateEvent = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   index: number
  // ) => {
  //   let tempList = [...events];
  //   const newValue = {
  //     value: e.target.value,
  //     showError: false,
  //   };
  //   tempList.splice(index, 1, newValue);
  //   setEvents(tempList);
  // };

  const handleDeleteThisEvent = (index: number) => {
    let tempList = [...events];
    tempList.splice(index, 1);
    setEvents(tempList);
    root.setEvents(tempList);
  };

  const handleAddEvents = () => {
    const { openDialog } = root;
    openDialog({
      title: 'Add Event',
      component: (
        <DialogComponent events={events} setEvents={setEvents} root={root} />
      ),
    });
  };

  const handleModifyEvent = (item: TEvent, index: number) => {
    const { openDialog } = root;
    openDialog({
      title: 'Modify Event',
      component: (
        <DialogComponent
          events={events}
          setEvents={setEvents}
          root={root}
          modifyInfo={item}
          index={index}
        />
      ),
    });
  };

  // const handlePreviewEvents = () => {
  //   let tempList = events.map(item => ({
  //     value: item.value,
  //     showError: item.value.trim() === '',
  //   }));
  //   if (tempList.some(i => i.showError)) {
  //     setEvents(tempList);
  //     return;
  //   }
  //   root.setEvents(events);
  // };

  return (
    <div className={`${classes.eventSection} ${className}`}>
      <div className={classes.btnGroup}>
        <Button
          variant="contained"
          onClick={handleAddEvents}
          endIcon={<AddCircleOutlineIcon />}
        >
          Add
        </Button>
      </div>
      <ul className={classes.eventsListWrapper}>
        {!events.length ? (
          <li
            style={{
              textAlign: 'center',
            }}
          >
            No Data
          </li>
        ) : (
          events.map((item, index) => (
            <li key={index}>
              <p className={classes.text}>{item.value}</p>

              <span
                className="iconWrapper"
                onClick={() => handleDeleteThisEvent(index)}
              >
                <HighlightOffIcon />
              </span>
              <span
                className="iconWrapper"
                onClick={() => handleModifyEvent(item, index)}
              >
                <CreateIcon />
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default EventsSection;
