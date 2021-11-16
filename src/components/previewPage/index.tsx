import { makeStyles } from '@material-ui/styles';
import { Typography } from '@mui/material';
import { rootContext } from '../rootContent';
import { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import bg from '../../assets/images/background.png';

type PropsType = {
  className?: string;
};

const useStyles = makeStyles(() => ({
  previewPageConatiner: {
    flex: 1,
    border: '1px solid blue',
  },
  headerSection: {
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: '67px 30px',
    color: '#fff',
  },
  eventsSectionContainer: {},
  birthdaySectionContainer: {},
}));

//  <p>挥手-- &#x1F44b;</p>
//       <p>蛋糕—— &#x1F382;</p>
//       <p>fire-- &#x1F525;</p>
//       <p>popper-- &#x1F389;</p>

const PreviewPage: React.FC<PropsType> = ({ className = '' }) => {
  const { month, events, birthdayPerson, anniversaryPerson, newHeros } =
    useContext(rootContext);

  const classes = useStyles();
  return (
    <div className={`${classes.previewPageConatiner} ${className}`}>
      <div className={classes.headerSection}>
        <Typography>Oct.2021</Typography>
        <Typography>{month}月回顾</Typography>
      </div>

      <div className={classes.eventsSectionContainer}>
        <ul>
          {events.map((item, index) => (
            <li key={index}>
              <Typography variant="body1" component="p">
                {item.value}{' '}
              </Typography>
            </li>
          ))}
        </ul>
      </div>

      <div className={classes.birthdaySectionContainer}>
        <ul>
          {birthdayPerson.map((item, index) => (
            <li key={index}>
              <Avatar alt={item.name} src={item.avatar} />
              <Typography variant="body1" component="p">
                {item.name}
              </Typography>
              <Typography variant="body1" component="p">
                {item.heroName}
              </Typography>
              <Typography variant="body1" component="p">
                {item.officePost}
              </Typography>
              {item.jobTitle && (
                <Typography variant="body1" component="p">
                  {item.jobTitle}
                </Typography>
              )}
              <Typography variant="body1" component="p">
                {item.birthDate}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PreviewPage;
