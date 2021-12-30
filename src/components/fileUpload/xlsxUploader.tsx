import { useRef } from 'react';
import { handleReadReportFile } from '../../utils';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';

const useStyles = makeStyles(() => ({
  boradPageEditor: {
    flex: 1,
    padding: '60px 0',
    display: 'flex',
  },
  btn: {
    marginBottom: '24px',
  },
  hidden: {
    visibility: 'hidden',
    opacity: 0,
    position: 'absolute',
    zIndex: -1,
  },
}));

const XlsxFileUploader = (props: { dataConvert: any }) => {
  const { dataConvert } = props;
  const classes = useStyles();
  const uploader = useRef<HTMLInputElement>(null!);

  const handleBatchImport = () => {
    uploader.current.click();
  };

  return (
    <div className="">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={e => {
          handleReadReportFile(e, dataConvert);
        }}
        className={classes.hidden}
        ref={uploader}
      />

      <div className={classes.btn}>
        <Button variant="contained" onClick={handleBatchImport}>
          Batch Import
        </Button>
      </div>
    </div>
  );
};

export default XlsxFileUploader;
