import BoradEditor from '../../components/borad-edit';
import BoradPreview from '../../components/borad-preview';
import { makeStyles } from '@mui/styles';
import { Margin } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
  boradPageContainer: {
    display: 'flex',
    maxWidth: '1440px',
    margin: '0 auto',
    alignItems: 'stretch',
  },
}));

const Borad = () => {
  const classes = useStyles();
  return (
    <div className={classes.boradPageContainer}>
      <BoradEditor />
      <BoradPreview />
    </div>
  );
};

export default Borad;
