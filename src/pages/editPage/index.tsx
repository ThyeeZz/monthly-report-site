import { makeStyles } from '@material-ui/styles';
import { useState, useContext, useCallback } from 'react';
import { rootContext } from '../../components/rootContent';
import { Months } from '../../types';
import CommonEditSection from '../../components/comonEditSection';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, Button } from '@mui/material';
import EventsEditSection from '../../components/eventsEditSection';
import { screenShoot } from '../../utils';
import ReviewCotent from '../../components/dalogContentComp/reviewContent';

type PropsType = {
  className?: string;
};

const currentMonth = new Date().getMonth();

const useStyles = makeStyles(() => ({
  editPageConatiner: {
    flex: 1,
    borderRight: '1px solid #ccc',
    padding: '64px',
  },
  monthSelector: {},
  sectionContainer: {
    borderBottom: '1px solid #ccc',
    padding: '32px 0',

    '& .title': {
      marginBottom: '40px',
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '32px',
    },
  },
  firstSection: {
    paddingTop: 0,
  },
  btnsGroup: {
    marginTop: '40px',

    '& .previewBtn': {
      marginRight: '24px',
    },
  },
  containedBtn: {
    boxShadow: 'none !important',
  },
}));

const EditPage: React.FC<PropsType> = ({ className = '' }) => {
  const classes = useStyles();
  const root = useContext(rootContext);

  const [month, setMonth] = useState<number>(currentMonth);
  const handleMonthChange = (e: SelectChangeEvent<string>) => {
    const value = parseInt(e.target.value);
    setMonth(value);
    root.setMonth(value);
  };

  const renderMonthOptions = () => {
    return Array.from({ length: 12 }).map((_, k) => (
      <MenuItem key={Months[k]} value={k}>
        {Months[k]}
      </MenuItem>
    ));
  };

  const handlePreview = async () => {
    const { previewEle, openDialog } = root;
    const src = await screenShoot(previewEle);

    openDialog({
      title: 'Preview Image',
      component: <ReviewCotent src={src} month={Months[month]} />,
    });
  };

  return (
    <section className={`${classes.editPageConatiner} ${className}`}>
      <div className={`${classes.sectionContainer} ${classes.firstSection}`}>
        <InputLabel id="month-selector">选择月份</InputLabel>
        <Select
          labelId="month-selector"
          value={String(month)}
          onChange={handleMonthChange}
          label="选择月份"
        >
          {renderMonthOptions()}
        </Select>
      </div>
      <div className={classes.sectionContainer}>
        <h3 className="title">{Months[month]}大事记</h3>
        <EventsEditSection />
      </div>

      <div className={classes.sectionContainer}>
        <h3 className="title">{Months[month]}寿星</h3>
        <CommonEditSection keyWord="birthday" />
      </div>

      <div className={classes.sectionContainer}>
        <h3 className="title">周年庆</h3>
        <CommonEditSection keyWord="anniversary" />
      </div>

      <div className={classes.sectionContainer}>
        <h3 className="title">新英雄</h3>
        <CommonEditSection keyWord="newHero" />
      </div>

      <div className={classes.btnsGroup}>
        <Button
          variant="outlined"
          className="previewBtn"
          onClick={handlePreview}
        >
          Preview
        </Button>
      </div>
    </section>
  );
};

export default EditPage;
