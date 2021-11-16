import { makeStyles } from '@material-ui/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel, MenuItem } from '@mui/material';
import { useState, useContext } from 'react';
import { rootContext } from '../rootContent';
import EventsSection from '../eventsSection';
import { TEvent, Months } from '../../types';
import BirthdaySection from '../birthdaySection';
import SectionTitleBar from '../sectionTitle';

type PropsType = {
  className?: string;
};

const currentMonth = new Date().getMonth();

const useStyles = makeStyles(() => ({
  editPageConatiner: {
    flex: 1,
    border: '1px solid red',
    fontFamily: 'Roboto',
    padding: '64px',

    '& .title': {
      marginBottom: '40px',
      fontWeight: 600,
    },
  },
  eventsSectionContainer: {
    marginBottom: '40px',
    '& .title': {
      marginBottom: '40px',
      fontWeight: 600,
    },
  },
  birthdaySection: {},
  anniversarySetion: {},
  newHeroSection: {},
}));

const EditPage: React.FC<PropsType> = ({ className = '' }) => {
  const classes = useStyles();
  const root = useContext(rootContext);

  const [month, setMonth] = useState<string>(Months[currentMonth]);
  const [events, setEvents] = useState<TEvent[]>([]);

  const renderMonthOptions = () => {
    return Array.from({ length: 12 }).map((_, k) => (
      <MenuItem key={Months[k]} value={Months[k]}>
        {Months[k]}
      </MenuItem>
    ));
  };

  const handleMonthChange = (e: SelectChangeEvent<string>) => {
    setMonth(e.target.value);
  };

  return (
    <div className={`${classes.editPageConatiner} ${className}`}>
      <div className={classes.eventsSectionContainer}>
        <SectionTitleBar canSelect={true} month={month} setMonth={setMonth} />

        <EventsSection />
      </div>

      <div className={classes.birthdaySection}>
        <SectionTitleBar canSelect={false} month={month} />
        <BirthdaySection />
      </div>

      <div className={classes.anniversarySetion}></div>

      <div className={classes.newHeroSection}></div>
    </div>
  );
};

export default EditPage;
