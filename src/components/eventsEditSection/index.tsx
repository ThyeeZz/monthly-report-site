import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { useState, useContext } from 'react';
import { rootContext } from '../rootContext';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TEvent } from '../../types';
import DialogComponent from '../dalogContentComp/eventContent';

type PropType = {
  className?: string;
  title: string;
  data: { value: string; showError: boolean }[];
  setData: any;
  isImport: boolean;
};

const useStyles = makeStyles(theme => ({
  eventSection: {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '32px',
  },
  titleBar: {
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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

const EventsSection: React.FC<PropType> = ({
  className = '',
  title,
  data: events,
  setData: setEvents,
  isImport,
}) => {
  const classes = useStyles();
  const root = useContext(rootContext);

  const handleDeleteThisEvent = (index: number) => {
    if (isImport) {
      return;
    }
    let tempList = [...events];
    tempList.splice(index, 1);
    setEvents(tempList);
    root.setReportData((v: any) => ({
      ...v,
      events: tempList,
    }));
  };

  const handleAddEvents = () => {
    const { openDialog } = root;
    openDialog({
      title: 'Add Event',
      component: <DialogComponent events={events} setEvents={setEvents} />,
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
          modifyInfo={item}
          index={index}
        />
      ),
    });
  };

  return (
    <div className={`${classes.eventSection} ${className}`}>
      <div className={classes.titleBar}>
        <h3 className="title">{title}</h3>
        <Button
          variant="outlined"
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
              color: '#9a9a9a',
              fontSize: '14px',
              lineHeight: '22px',
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
