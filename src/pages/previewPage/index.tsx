import { makeStyles } from '@material-ui/styles';
import { rootContext } from '../../components/rootContent';
import { useContext, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import bg from '../../assets/images/background.png';
import { MonthsEn, Months } from '../../types';
import zilliz from '../../assets/images/zilliz.png';

type PropsType = {
  className?: string;
};

const useStyles = makeStyles(() => ({
  previewPageConatiner: {
    flex: '0 0 425px',
    fontFamily: 'PingFang',
    fontWeight: 600,
    padding: '64px',
    background: '#fafafa',
  },
  container: {
    height: 'auto',
  },
  headerSection: {
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: '67px 30px',
    color: '#fff',

    '& h1': {
      fontFamily: 'Poppins',
      fontWeight: 800,
      fontSize: '80px',
      lineHeight: '80px',
    },

    '& h2': {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '50px',
    },
  },
  contentWrapper: {
    padding: '40px 30px',
    background: '#fff',
  },
  sectionContainer: {
    marginBottom: '50px',
    fontSize: '14px',
    lineHeight: '30px',

    '& h3': {
      fontWeight: 600,
      fontSize: '32px',
      lineHeight: '42px',
      marginBottom: '20px',
    },
  },
  footerSection: {
    background: '#000',
    padding: '30px 0',
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
    justifyContent: 'center',

    '& li': {
      flex: '0 0 50%',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
    events,
    birthdayPerson,
    anniversaryPerson,
    newHeros,
    setPreviewEle,
  } = useContext(rootContext);
  const classes = useStyles();

  useEffect(() => {
    setPreviewEle(previewEle.current);
  }, []);

  return (
    <section className={`${classes.previewPageConatiner} ${className}`}>
      <div className={classes.container} ref={previewEle}>
        <div className={classes.headerSection}>
          <h1>{MonthsEn[month]}2021</h1>
          <h2>{month + 1}月回顾</h2>
        </div>

        <div className={classes.contentWrapper}>
          {!!events.length ? (
            <div className={classes.sectionContainer}>
              <h3>
                &#x1F525; <span>{Months[month]}大事记</span>{' '}
              </h3>
              <ul className={classes.eventsList}>
                {events.map((item, index) => (
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
                &#x1F382; <span>{Months[month]}寿星</span>{' '}
              </h3>
              <ul className={classes.staffList}>
                {birthdayPerson.map((item, index) => (
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
                    <p className={classes.specialInfo}>{item.birthDate}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!anniversaryPerson.length && (
            <div className={classes.sectionContainer}>
              <h3>&#x1F389; 周年庆</h3>
              <ul className={classes.staffList}>
                {anniversaryPerson.map((item, index) => (
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
                      {item.anniversary}周年
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!newHeros.length && (
            <div className={classes.sectionContainer}>
              <h3>&#x1F44b; 新英雄</h3>
              <ul className={classes.staffList}>
                {newHeros.map((item, index) => (
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
                    <p className={classes.specialInfo}>{item.anniversary}</p>
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
          <p>人事行政部</p>
        </div>
      </div>
    </section>
  );
};

export default PreviewPage;
