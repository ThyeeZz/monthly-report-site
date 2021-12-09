import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  boradPagePreview: {
    flex: 1,
    border: '1px solid red',
  },
}));

const BoradPreview = () => {
  const classes = useStyles();
  return <div className={classes.boradPagePreview}></div>;
};

export default BoradPreview;
