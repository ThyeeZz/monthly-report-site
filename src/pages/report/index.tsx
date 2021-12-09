import EditPage from '../../components/report-edit';
import PreviewPage from '../../components/report-preview';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  reportPageContainer: {
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'flex',
  },
}));

const Report = () => {
  const classes = useStyles();
  return (
    <div className={classes.reportPageContainer}>
      <EditPage />
      <PreviewPage />
    </div>
  );
};

export default Report;
