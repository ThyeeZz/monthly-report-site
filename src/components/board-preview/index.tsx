import { makeStyles } from '@mui/styles';
import hello from '../../assets/images/hello.png';
import javan from '../../assets/images/jarvan.jpeg';
import { formatAreaData } from '../../utils';
import areaData from '../../utils/areaData.json';
import { MonthsEn } from '../../types';
import { useRef } from 'react';

const provinces = formatAreaData(areaData, '86');

const useStyles = makeStyles(() => ({
  boardPagePreview: {
    width: '100%',
    minHeight: '900px',
  },
  header: {
    height: '200px',
    padding: '40px 60px',
    boxSizing: 'border-box',
    position: 'relative',

    '& img': {
      maxHeight: '120px',
      verticalAlign: 'middle',
      position: 'absolute',
      top: '50%',
      left: '60px',
      transform: 'translateY(-50%)',
      zIndex: 1,
      pointerEvents: 'none',
    },
  },
  colorfulBg: {
    position: 'absolute',
    top: 0,
    bottom: '-30px',
    left: 0,
    right: 0,
    background:
      'linear-gradient(180deg, #008CFF 0%, rgba(0, 140, 255, 0) 100%)',
  },
  topSection: {
    height: '300px',
    display: 'flex',
    padding: '0 60px',
    boxSizing: 'border-box',
  },
  partSection: {
    flex: 1,
    display: 'flex',
  },
  verticalPartSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bottomSection: {
    height: '400px',
    padding: '0 60px',
    boxSizing: 'border-box',
    display: 'flex',
    paddingBottom: '40px',
  },
  imgWrapper: {
    flex: '0 0 206px',
    height: '206px',

    '& img ': {
      width: '100%',
      height: '100%',
    },
  },
  infoWrapper: {
    flex: '1',
    padding: '0 40px',
  },
  name: {
    marginBottom: '30px',
  },
  desc: {},
  label: {
    fontSize: '16px',
    lineHeight: '24px',
    marginBottom: '5px',
    color: '#656565',
  },
  content: {
    fontSize: '25px',
    lineHeight: '30px',
    fontWeight: 800,
    wordBreak: 'break-word',
    whiteSpace: 'break-spaces',
    marginBottom: '8px',
  },
  line: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '34px',
  },
  hobbitWrapper: {
    display: 'flex',
    flexWrap: 'wrap',

    '& p': {
      width: '50%',
      marginBottom: '8px',
    },
  },
}));

const BoardPreview = (props: { data: any }) => {
  const classes = useStyles();
  const { data } = props;

  console.log('data--', data);

  const getBirthday = (date: Date | null) => {
    if (!date) {
      return '';
    }
    const month = MonthsEn[new Date(date).getMonth()];
    const day = new Date(date).getDate();
    return `, ${month}${day}th`;
  };

  const formatHobbitItem = (hobbit: string) => {
    if (!hobbit) {
      return '';
    }
    return `#${hobbit}`;
  };

  return (
    <section className={classes.boardPagePreview}>
      <div className={classes.header}>
        <img src={hello} alt="" />
        <div className={classes.colorfulBg}></div>
      </div>

      <div className={classes.topSection}>
        <div className={classes.partSection}>
          <div className={classes.imgWrapper}>
            <img src={data.photo || javan} alt={data.name} />
          </div>

          <div className={classes.infoWrapper}>
            <div className={classes.name}>
              <p className={classes.label}>Name</p>
              <p className={classes.content}>{data.name}</p>
            </div>
            <div className={classes.desc}>
              <p className={classes.label}>Brief Self-introduction</p>
              <p
                className={classes.content}
                style={{ fontSize: '18px', lineHeight: '24px' }}
              >
                {data.selfIntru}
              </p>
            </div>
          </div>
        </div>
        <div className={classes.partSection}>
          <div
            className={classes.imgWrapper}
            style={{ borderRadius: '50%', overflow: 'hidden' }}
          >
            <img src={data.photo || javan} alt={data.heroName} />
          </div>

          <div className={classes.infoWrapper}>
            <div className={classes.name}>
              <p className={classes.label}>Your Hero</p>
              <p className={classes.content}>{data.heroName}</p>
            </div>
            <div className={classes.desc}>
              <p className={classes.label}>Reason</p>
              <p
                className={classes.content}
                style={{ fontSize: '18px', lineHeight: '24px' }}
              >
                {data.reason}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.bottomSection}>
        <div
          className={classes.verticalPartSection}
          style={{ marginRight: '140px' }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '34px',
            }}
          >
            <div>
              <p className={classes.label}>Title</p>
              <p className={classes.content}>{data.title}</p>
            </div>
            <div>
              <p className={classes.label}>Working Location</p>
              <p className={classes.content}>{data.location}</p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '34px',
            }}
          >
            <div>
              <p className={classes.label}>Department</p>
              <p className={classes.content}>{data.department}</p>
            </div>
            <div>
              <p className={classes.label}>Line Manager</p>
              <p className={classes.content}>{data.mentor}</p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              marginBottom: '34px',
            }}
          >
            <div>
              <p className={classes.label}>Place Of Birth</p>
              <p className={classes.content}>
                {data.province} {getBirthday(data.date)}
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              marginBottom: '34px',
            }}
          >
            <div className="">
              <p className={classes.label}>Hobbies</p>
              <div className={classes.hobbitWrapper}>
                {data.hobbies.map((item: string, index: number) => (
                  <p className={classes.content} key={index}>
                    {formatHobbitItem(item)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.verticalPartSection}>
          <div
            style={{
              display: 'flex',
              marginBottom: '34px',
            }}
          >
            <div className="">
              <p className={classes.label}>Education Background</p>
              <div>
                {data.education.map((item: string, index: number) => (
                  <p className={classes.content} key={index}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
            }}
          >
            <div className="">
              <p className={classes.label}>Past Experience</p>
              <div>
                {data.exprience.map((item: string, index: number) => (
                  <p className={classes.content} key={index}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardPreview;
