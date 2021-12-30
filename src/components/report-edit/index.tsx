import { makeStyles } from '@mui/styles';
import { useState, useContext } from 'react';
import { rootContext } from '../rootContext';
import { Months, TEmployee, TEvent, StaffInfoTypeFromFile } from '../../types';
import CommonEditSection from '../comonEditSection';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, Button, FormControl } from '@mui/material';
import EventsEditSection from '../eventsEditSection';
import { screenShoot } from '../../utils';
import ReviewCotent from '../dalogContentComp/reviewContent';
import previewIcon from '../../assets/images/preview.svg';
import { getMonthNumber, formatDate } from '../../utils';
import XlsxFileUploader from '../fileUpload/xlsxUploader';

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
    padding: '32px 0',
    borderBottom: '1px solid #e9e9ed',

    '& .title': {
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '32px',
      color: '#000',
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
      padding: '16px 0',
      fontSize: '20px',

      '& img': {
        width: '20px',
        marginLeft: '8px',
      },
    },
  },
  containedBtn: {
    boxShadow: 'none !important',
  },
  selector: {
    '& .MuiSelect-select': {
      color: '#000',
      '&:focus': {
        borderColor: 'red',
      },
    },
  },
}));

const EditPage: React.FC<PropsType> = ({ className = '' }) => {
  const classes = useStyles();
  const root = useContext(rootContext);

  const [month, setMonth] = useState<number>(currentMonth);
  const [events, setEvents] = useState<TEvent[]>([]);
  const [birthdayPerson, setBirthdayPerson] = useState<TEmployee[]>([]);
  const [anniversaryPerson, setAnniversaryPerson] = useState<TEmployee[]>([]);
  const [newHeros, setNewHeros] = useState<TEmployee[]>([]);

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

  const formatStaffData = (data: any) => {
    return data.map((item: any) => {
      const {
        birthday,
        name,
        hero_name,
        department,
        job_title,
        board_date,
        anniversary,
      } = item;
      return {
        avatar: '',
        name,
        heroName: hero_name,
        officePost: job_title,
        jobTitle: '',
        birthDate: birthday ? formatDate(birthday as Date) : undefined,
        boardTime: board_date ? formatDate(board_date) : undefined,
        anniversary: anniversary || '一',
      };
    });
  };

  const formatEvents = (
    events: {
      month?: string;
      content?: string;
    }[]
  ): TEvent[] => {
    return events.map(i => {
      const { month, content = '' } = i;
      return {
        value: content,
        showError: false,
      };
    });
  };

  const dataConvert = (data: any) => {
    const { setReportData } = root;
    const { anniversary = [], birthday = [], events = [], board = [] } = data;

    setEvents(formatEvents(events));
    setBirthdayPerson(formatStaffData(birthday));
    setAnniversaryPerson(formatStaffData(anniversary));
    setNewHeros(formatStaffData(board));
    setReportData({
      events: formatEvents(events),
      birthdayPerson: formatStaffData(birthday),
      anniversaryPerson: formatStaffData(anniversary),
      newHeros: formatStaffData(board),
    });
  };

  return (
    <section className={`${classes.editPageConatiner} ${className}`}>
      <XlsxFileUploader dataConvert={dataConvert} />
      <div className={`${classes.sectionContainer} ${classes.firstSection}`}>
        <FormControl fullWidth>
          <InputLabel id="month-selector">选择月份</InputLabel>
          <Select
            labelId="month-selector"
            value={String(month)}
            onChange={handleMonthChange}
            label="选择月份"
            classes={{ root: classes.selector }}
          >
            {renderMonthOptions()}
          </Select>
        </FormControl>
      </div>
      <div className={classes.sectionContainer}>
        <EventsEditSection
          title={`${Months[getMonthNumber(month) - 1]}大事记`}
          data={events}
          setData={setEvents}
        />
      </div>

      <div className={classes.sectionContainer}>
        <CommonEditSection
          keyWord="birthday"
          title={`${Months[month]}寿星`}
          data={birthdayPerson}
          setData={setBirthdayPerson}
        />
      </div>

      <div className={classes.sectionContainer}>
        <CommonEditSection
          keyWord="anniversary"
          title="周年庆"
          data={anniversaryPerson}
          setData={setAnniversaryPerson}
        />
      </div>

      <div className={classes.sectionContainer} style={{ border: 'none' }}>
        <CommonEditSection
          keyWord="newHero"
          title="新英雄"
          data={newHeros}
          setData={setNewHeros}
        />
      </div>

      <div className={classes.btnsGroup}>
        <Button
          variant="contained"
          className="previewBtn"
          onClick={handlePreview}
          fullWidth
          children={
            <>
              <span>PREVIEW</span>
              <img src={previewIcon} alt="" />
            </>
          }
        />
      </div>
    </section>
  );
};

export default EditPage;
