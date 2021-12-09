import { makeStyles } from '@mui/styles';
import { FormHelperText, TextField } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';

const useStyles = makeStyles(() => ({
  textField: {
    width: '100%',
  },
}));

interface PropsType {
  name?: string;
  fullWidth?: boolean;
  label: string;
  required?: boolean;
  rows?: number;
  multiline?: boolean;
  maxLength: number;
  initalHelpText?: string;
  className?: string;
  value?: any;
  onChange?: (param: any) => void;
}

const WordsLimitedTextFiled = ({
  name = '',
  fullWidth = false,
  label,
  required = false,
  rows = 0,
  multiline = false,
  maxLength = Infinity,
  initalHelpText = '',
  className = '',
  value,
  onChange = () => {},
}: PropsType) => {
  const classes = useStyles();
  const [helpText, setHelpText] = useState(initalHelpText);
  const inputEle = useRef<HTMLInputElement>(null!);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (maxLength < Infinity) {
      const { value } = e.target;
      if (value.length > maxLength) {
        e.preventDefault();
        return;
      }
      setHelpText(
        `max words: ${maxLength}, ${maxLength - value.length} remind`
      );
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value === '');
    if (value.trim() !== '') {
      return;
    }
    setHelpText(initalHelpText);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  useEffect(() => {
    inputEle.current.setAttribute('maxLength', `${maxLength}`);
  }, []);

  return (
    <div className={`${classes.textField} ${className}`}>
      <TextField
        name={name}
        fullWidth={fullWidth}
        label={label}
        variant="outlined"
        required={required}
        rows={rows}
        multiline={multiline}
        onInput={handleInput}
        inputRef={inputEle}
        onBlur={handleBlur}
        value={value}
        onChange={handleChange}
      />
      <FormHelperText>{helpText}</FormHelperText>
    </div>
  );
};

export default WordsLimitedTextFiled;
