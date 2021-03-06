import { makeStyles } from '@mui/styles';
import { rootContext } from '../rootContext';
import { useContext, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import bg from '../../assets/images/background.png';
import { MonthsEn, Months } from '../../types';
import zilliz from '../../assets/images/zilliz.png';
import { formatDate, getMonthNumber, useSystem } from '../../utils';
import { TEmployee, TEvent } from '../../types';

type PropsType = {
  className?: string;
};

const useStyles = makeStyles(() => ({
  previewPageConatiner: {
    flex: '0 0 425px',
    fontWeight: 600,
    padding: '64px',
    background: '#324367',
  },
  container: {
    height: 'auto',
  },
  headerSection: {
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: '67px 30px 48px',
    color: '#fff',

    '& h1': {
      fontFamily: 'Poppins ExtraBold',
      fontWeight: 800,
    },

    '& h2': {
      fontFamily: 'Poppins Bold',
      fontSize: '20px',
      lineHeight: '28px',
    },

    '& .month': {
      fontSize: '80px',
      lineHeight: '80px',
    },

    '& .year': {
      fontFamily: 'Poppins Bold',
      fontSize: '40px',
    },
  },
  contentWrapper: {
    padding: '40px 30px',
    background: '#fff',
  },
  sectionContainer: {
    marginBottom: '30px',
    fontSize: '14px',
    lineHeight: '30px',

    '& h3': {
      fontWeight: 600,
      fontSize: '32px',
      lineHeight: '42px',
      marginBottom: '30px',
    },
  },
  eventSection: {
    '& h3': {
      marginBottom: '20px',
    },
  },
  footerSection: {
    background: '#000',
    padding: '40px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    '& .imgWrapper': {
      marginBottom: '20px',
      textAlign: 'center',

      '& img': {
        height: '14px',
        width: '54px',
      },
    },

    '& p': {
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '42px',
      color: '#fff',
      textAlign: 'center',
      letterSpacing: '10px',
    },
  },
  eventsList: {
    listStyle: 'disc',
    paddingLeft: '30px',
  },
  text: {
    fontSize: '16px',
    lineHeight: '30px',
    fontWeight: 400,
  },
  staffList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',

    '& li': {
      flex: '0 0 50%',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
    },
  },
  avatar: {
    width: '100px !important',
    height: '100px !important',
    marginBottom: '10px',
  },
  name: {
    fontSize: '18px',
    lineHeight: '24px',
    marginBottom: '4px',
    textAlign: 'center',
  },
  heroName: {
    fontSize: '12px',
    lineHeight: '12px',
    marginBottom: '4px',
    color: '#06AFF2',
  },
  position: {
    fontSize: '12px',
    lineHeight: '12px',
    marginBottom: '14px',
    color: '#9A9A9A',
  },
  specialInfo: {
    color: '#010101',
    fontSize: '12px',
    lineHeight: '12px',
  },
  noDate: {
    fontSize: '18px',
    lineHeight: '24px',
    textAlign: 'center',
  },
}));

const PreviewPage: React.FC<PropsType> = ({ className = '' }) => {
  const previewEle = useRef<any>(null!);

  const {
    month,
    reportData: { events, birthdayPerson, anniversaryPerson, newHeros },
    setPreviewEle,
  } = useContext(rootContext);
  console.log(month);

  const classes = useStyles();

  useEffect(() => {
    setPreviewEle(previewEle.current);
  }, [setPreviewEle]);

  return (
    <section className={`${classes.previewPageConatiner} ${className}`}>
      <div className={classes.container} ref={previewEle}>
        <div className={classes.headerSection}>
          <h1>
            <span className="month">{MonthsEn[month]}</span>
            <span className="year">{new Date().getFullYear()}</span>
          </h1>
          <h2>{month + 1}?????????</h2>
        </div>

        <div className={classes.contentWrapper}>
          {!!events.length ? (
            <div
              className={`${classes.sectionContainer} ${classes.eventSection}`}
            >
              <h3>
                &#x1F525; <span>{Months[getMonthNumber(month)]}?????????</span>{' '}
              </h3>
              <ul className={classes.eventsList}>
                {(events as TEvent[]).map((item, index) => (
                  <li key={index}>
                    <p className={classes.text}>{item.value} </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {!!birthdayPerson.length && (
            <div className={classes.sectionContainer}>
              <h3>
                &#x1F382; <span>{Months[month]}??????</span>{' '}
              </h3>
              <ul className={classes.staffList}>
                {(birthdayPerson as TEmployee[]).map((item, index) => (
                  <li key={index}>
                    <Avatar
                      alt={item.name}
                      src={item.avatar}
                      className={classes.avatar}
                    />
                    <p className={classes.name}>{item.name}</p>
                    <p className={classes.heroName}>{item.heroName}</p>
                    <p className={classes.position}>{item.officePost}</p>
                    {item.jobTitle && (
                      <p className={classes.position}>{item.jobTitle}</p>
                    )}
                    <p className={classes.specialInfo}>
                      {/* {formatDate(
                        item.birthDate as unknown as Date,
                        'birthday'
                      )} */}
                      {item.birthDate}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!anniversaryPerson.length && (
            <div className={classes.sectionContainer}>
              <h3>&#x1F389; ?????????</h3>
              <ul className={classes.staffList}>
                {(anniversaryPerson as TEmployee[]).map((item, index) => (
                  <li key={index}>
                    <Avatar
                      alt={item.name}
                      src={item.avatar}
                      className={classes.avatar}
                    />
                    <p className={classes.name}>{item.name}</p>
                    <p className={classes.heroName}>{item.heroName}</p>
                    <p className={classes.position}>{item.officePost}</p>
                    {item.jobTitle && (
                      <p className={classes.position}>{item.jobTitle}</p>
                    )}
                    <p className={classes.specialInfo}>
                      {item.anniversary}??????
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!newHeros.length && (
            <div className={classes.sectionContainer}>
              <h3>&#x1F44b; ?????????</h3>
              <ul className={classes.staffList}>
                {(newHeros as TEmployee[]).map((item, index) => (
                  <li key={index}>
                    <Avatar
                      alt={item.name}
                      src={item.avatar}
                      className={classes.avatar}
                    />
                    <p className={classes.name}>{item.name}</p>
                    <p className={classes.heroName}>{item.heroName}</p>
                    <p className={classes.position}>{item.officePost}</p>
                    {item.jobTitle && (
                      <p className={classes.position}>{item.jobTitle}</p>
                    )}
                    <p className={classes.specialInfo}>
                      <p className={classes.specialInfo}>
                        {/* {formatDate(item.boardTime as unknown as Date, '')} */}
                        {item.boardTime}
                      </p>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className={classes.footerSection}>
          <div className="imgWrapper">
            <img src={zilliz} alt="zilliz" />
          </div>
          <p>???????????????</p>
        </div>
      </div>
    </section>
  );
};

export default PreviewPage;
