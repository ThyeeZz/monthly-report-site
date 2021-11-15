import { makeStyles } from '@material-ui/styles';
import { TextField, Button } from '@mui/material';
import { useState, useContext } from 'react';
import { rootContext } from '../rootContent';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PreviewIcon from '@mui/icons-material/Preview';
import { TEvent } from '../../types';

type PropType = {
  className?: string;
};

const useStyles = makeStyles(theme => ({
  eventSection: {},
  btnGroup: {
    marginBottom: '40px',
    '&>button:first-child': {
      marginRight: '16px',
    },
  },
  eventsListWrapper: {
    '&>li': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px',
    },

    '& .iconWrapper': {
      fontSize: '20px',
      marginLeft: '16px',
      cursor: 'pointer',
    },
  },
}));

const EventsSection: React.FC<PropType> = ({ className = '' }) => {
  const classes = useStyles();
  const root = useContext(rootContext);

  const [events, setEvents] = useState<TEvent[]>([
    {
      value: '',
      showError: false,
    },
  ]);

  const handleUpdateEvent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    let tempList = [...events];
    const newValue = {
      value: e.target.value,
      showError: false,
    };
    tempList.splice(index, 1, newValue);
    setEvents(tempList);
  };

  const handleDeleteThisEvent = (index: number) => {
    let tempList = [...events];
    tempList.splice(index, 1);
    setEvents(tempList);
  };

  const handleAddEvents = () => {
    let tempList = [...events];
    tempList = tempList.concat({
      value: '',
      showError: false,
    });
    setEvents(tempList);
  };

  const handlePreviewEvents = () => {
    let tempList = events.map(item => ({
      value: item.value,
      showError: item.value.trim() === '',
    }));
    if (tempList.some(i => i.showError)) {
      setEvents(tempList);
      return;
    }
    root.setEvents(events);
  };

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

        <Button
          variant="contained"
          onClick={handlePreviewEvents}
          endIcon={<PreviewIcon />}
        >
          Preview
        </Button>
      </div>
      <ul className={classes.eventsListWrapper}>
        {events.map((item, index) => (
          <li key={index}>
            <TextField
              label="Event Content"
              multiline
              minRows={3}
              fullWidth={true}
              value={item.value}
              error={item.showError}
              onChange={e => handleUpdateEvent(e, index)}
              helperText="Incorrect entry."
            />

            <span
              className="iconWrapper"
              onClick={() => handleDeleteThisEvent(index)}
            >
              <DoDisturbOnOutlinedIcon />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsSection;
