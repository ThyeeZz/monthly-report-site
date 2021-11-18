import { makeStyles } from '@mui/styles';
import { useState, useContext } from 'react';
import { rootContext } from '../../components/rootContent';
import { Months } from '../../types';
import CommonEditSection from '../../components/comonEditSection';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, Button } from '@mui/material';
import EventsEditSection from '../../components/eventsEditSection';
import { screenShoot } from '../../utils';
import ReviewCotent from '../../components/dalogContentComp/reviewContent';
import previewIcon from '../../assets/images/preview.svg';
import { getMonthNumber } from '../../utils';

type PropsType = {
  className?: string;
};

const currentMonth = new Date().getMonth();

const useStyles = makeStyles(() => ({
  editPageConatiner: {
    flex: 1,
    borderRight: '1px solid #ccc',
    padding: '64px',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  monthSelector: {},
  sectionContainer: {
    borderBottom: '1px solid #ccc',
    padding: '32px 0',

    '& .title': {
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '32px',
    },
  },
  firstSection: {
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnsGroup: {
    marginTop: '40px',

    '& .previewBtn': {
      marginRight: '24px',

      '& img': {
        width: '20px',
        marginLeft: '4px',
      },
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
      title: 'Preview',
      component: <ReviewCotent src={src} month={Months[month]} />,
    });
  };

  return (
    <section className={`${classes.editPageConatiner} ${className}`}>
      <div className={`${classes.sectionContainer} ${classes.firstSection}`}>
        <InputLabel id="month-selector" className="title">
          选择月份
        </InputLabel>
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
        <EventsEditSection
          title={`${Months[getMonthNumber(month - 1)]}大事记`}
        />
      </div>

      <div className={classes.sectionContainer}>
        <CommonEditSection keyWord="birthday" title={`${Months[month]}寿星`} />
      </div>

      <div className={classes.sectionContainer}>
        <CommonEditSection keyWord="anniversary" title="周年庆" />
      </div>

      <div className={classes.sectionContainer}>
        <CommonEditSection keyWord="newHero" title="新英雄" />
      </div>

      <div className={classes.btnsGroup}>
        <Button
          variant="contained"
          className="previewBtn"
          onClick={handlePreview}
          children={
            <>
              <span>Preview</span>
              <img src={previewIcon} alt="" />
            </>
          }
        />
      </div>
    </section>
  );
};

export default EditPage;
