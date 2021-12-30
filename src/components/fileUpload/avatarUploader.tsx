import React, { useRef, useState, ReactElement } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Button, Avatar } from '@mui/material';

const useStyles = makeStyles(() => ({
  fileUploader: {
    maxWidth: '100%',
    minWidth: '194px',
  },
  uploader: {
    position: 'absolute',
    zIndex: -1,
    visibility: 'hidden',
    opacity: 0,
    width: 0,
  },
  name: {
    padding: '0 24px',
  },
  tip: {
    paddingTop: '6px',
    fontSize: '12px',
    color: '#606266',
  },
  line: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: '24px',
  },
}));

interface Props {
  value: string;
  label: string;
  className?: string;
  onChange: (e: string) => void;
  tips?: string | ReactElement;
  name?: string;
}
const AvatarUpload = ({
  value,
  onChange,
  label,
  className = '',
  tips,
  name,
}: Props) => {
  const classes = useStyles();
  const uploader = useRef<HTMLInputElement>(null!);
  const [src, setSrc] = useState<string>(value || '');

  const handleUpload = () => {
    uploader.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    const value = window.URL.createObjectURL(file);
    setSrc(value);
    onChange(value);
  };
  return (
    <div className={classes.fileUploader}>
      <div className={classes.line}>
        <Button onClick={handleUpload} variant="contained">
          {label}
        </Button>
        <Avatar alt="avatar" src={src} className={classes.avatar}></Avatar>
      </div>
      <p className={classes.tip}>{tips}</p>
      <input
        name={name}
        type="file"
        accept="image/png, image/jpeg,image/jpg"
        ref={uploader}
        className={classes.uploader}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AvatarUpload;
