import { makeStyles } from '@material-ui/styles';
import { Typography } from '@mui/material';
import { rootContext } from '../rootContent';
import { useContext } from 'react';
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
}));

//  <p>挥手-- &#x1F44b;</p>
//       <p>蛋糕—— &#x1F382;</p>
//       <p>fire-- &#x1F525;</p>
//       <p>popper-- &#x1F389;</p>

const PreviewPage: React.FC<PropsType> = ({ className = '' }) => {
  const { month, events, birthdayPerson, anniversaryPerson, newHeros } =
    useContext(rootContext);
  console.log(month);

  const classes = useStyles();
  return (
    <div className={`${classes.previewPageConatiner} ${className}`}>
      <div className={classes.headerSection}>
        <Typography>Oct.2021</Typography>
        <Typography>{month}月大事记</Typography>
      </div>

      <div className={classes.eventsSectionContainer}>
        <ul>
          {events.map((item, index) => (
            <li key={`${item.value}${index}`}>
              <Typography variant="body1" component="p">
                {item.value}{' '}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PreviewPage;
