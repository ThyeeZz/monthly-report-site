import { makeStyles } from '@mui/styles';
import {
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import AvatarUpload from '../../fileUpload/avatarUploader';
import React, { useState, useRef, useEffect, ReactElement } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import areaData from '../../../utils/areaData.json';
import { formatAreaData } from '../../../utils';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import WordsLimitedTextFiled from '../../wordLimitedTextFiled';
import { rootContext } from '../../rootContext';

const provinces = formatAreaData(areaData, '86');

const useStyles = makeStyles(() => ({
  boradPageEditor: {
    flex: 1,
    padding: '60px',
  },
  lineItem: {
    marginBottom: '16px',
    display: 'flex',
    maxWidth: '100%',
    flex: 1,
  },
  onePieceRow: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    rowGap: '24px',
    marginBottom: '32px',
  },
  twoPiecesRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '24px',
    marginBottom: '32px',
  },
  fourPiecesRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,1fr)',
    columnGap: '24px',
    marginBottom: '32px',
  },

  topSection: {
    marginBottom: '16px',
    borderBottom: '1px solid blue',
    display: 'flex',
  },
  bottomSection: {},

  editList: {
    listStyle: 'none',
    display: 'flex',

    '&.inlineList': {
      alignItems: 'flex-start',
    },

    '&.blockList': {
      flexDirection: 'column',
      flex: 1,
    },

    '& li': {
      display: 'flex',
      alignItems: 'center',
      width: '80%',
      marginBottom: '24px',

      '& .icon-wrapper': {
        cursor: 'pointer',
        marginLeft: '12px',
        fontSize: '24px',
      },
    },
  },
  blueBtn: {
    '&:hover': {
      color: '#008CFF',
    },
  },
  redBtn: {
    '&:hover': {
      color: 'red',
    },
  },
}));

interface PropsType {
  setData: React.Dispatch<React.SetStateAction<any>>;
  data: any;
}

const ErrorText = (props: { alert: string }) => (
  <span style={{ color: 'red', fontSize: '12px' }}>{props.alert}</span>
);

const IntruductionComponent = (props: PropsType) => {
  const classes = useStyles();
  const { setData, data } = props;
  const [date, setDate] = useState<Date | null>(data.date || null);
  const [provinceKey, setProvinceKey] = useState(
    data.provinceKey || provinces[0].key
  );
  const [photo, setPhoto] = useState<string>(data.photo || '');
  const [name, setName] = useState<string>(data.name || '');
  const [heroPhoto, setHeroPhoto] = useState<string>(data.heroPhoto || '');
  const [selfIntru, setSelfIntru] = useState<string>(data.selfIntru || '');
  const [heroName, setHeroName] = useState<string>(data.heroName || '');
  const [reason, setReason] = useState<string>(data.reason || '');
  const [title, setTitle] = useState<string>(data.title || '');
  const [location, setLocation] = useState<string>(data.location || '');
  const [department, setDepartment] = useState<string>(data.department || '');
  const [mentor, setMentor] = useState<string>(data.mentor || '');

  const [hobbies, setHobbies] = useState({
    value: data.hobbies.concat(
      Array.from({ length: 4 - data.hobbies.length }).fill('')
    ),
    showError: false,
  });
  const [education, setEducation] = useState({
    value: data.education.concat(
      Array.from({ length: 4 - data.education.length }).fill('')
    ),
    showError: false,
  });
  const [exprience, setExprience] = useState({
    value: data.exprience.concat(
      Array.from({ length: 4 - data.exprience.length }).fill('')
    ),
    showError: false,
  });

  const handleProvinceChange = (e: SelectChangeEvent) => {
    setProvinceKey(e.target.value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { value } = e.target;
    setState(value);
  };

  const handleInputListChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<any>>,
    index: number
  ) => {
    const { value } = e.target;
    let newState = state;
    newState.splice(index, 1, value);

    setState(<T extends Object>(v: T) => ({
      ...v,
      value: newState,
    }));
  };

  const handleConfirm = () => {
    let bool: boolean = true;

    const hobbitValidate = hobbies.value.filter((v: string) => v !== '');
    const educationValidate = education.value.filter((v: string) => v !== '');
    const exprienceValidate = exprience.value.filter((v: string) => v !== '');

    bool =
      !!photo.trim() &&
      !!name.trim() &&
      !!selfIntru.trim() &&
      !!heroPhoto.trim() &&
      !!heroName.trim() &&
      !!reason.trim() &&
      !!title.trim() &&
      !!location.trim() &&
      !!department.trim() &&
      !!mentor.trim() &&
      !!provinceKey &&
      !!date &&
      !!hobbitValidate.length &&
      !!educationValidate.length &&
      !!exprienceValidate.length;

    // if (!bool) {
    //   alert('请完善信息！');
    //   return;
    // }

    setData({
      photo,
      name,
      heroPhoto,
      selfIntru,
      heroName,
      reason,
      title,
      location,
      department,
      mentor,
      provinceKey,
      date: date,
      hobbies: hobbitValidate,
      education: educationValidate,
      exprience: exprienceValidate,
    });
  };

  return (
    <div className={`${classes.boradPageEditor} border-page-container`}>
      <div className={classes.twoPiecesRow}>
        <div>
          <div className={classes.lineItem}>
            <AvatarUpload
              name="photo"
              value={photo}
              onChange={val => setPhoto(val)}
              label="Upload Photo"
              tips="只能上传jpg/png/jpeg文件"
            />
          </div>
          <div className={classes.lineItem}>
            <TextField
              fullWidth
              name="name"
              required
              label="Name"
              variant="outlined"
              value={name}
              onChange={e => handleInputChange(e, setName)}
            />
          </div>
          <div className={classes.lineItem}>
            <WordsLimitedTextFiled
              name="selfIntru"
              fullWidth={true}
              label="Brief Self-introduction"
              required={true}
              rows={3}
              multiline={true}
              maxLength={60}
              value={selfIntru}
              onChange={e => handleInputChange(e, setSelfIntru)}
              initalHelpText=""
            />
          </div>
        </div>

        <div>
          <div className={classes.lineItem}>
            <AvatarUpload
              name="heroPhoto"
              value={heroPhoto}
              onChange={val => setHeroPhoto(val)}
              label="Upload Hero Photo"
              tips="只能上传jpg/png/jpeg文件"
            />
          </div>
          <div className={classes.lineItem}>
            <TextField
              fullWidth
              label="Your Hero"
              name="heroName"
              variant="outlined"
              required
              value={heroName}
              onChange={e => handleInputChange(e, setHeroName)}
            />
          </div>
          <div className={classes.lineItem}>
            <WordsLimitedTextFiled
              name="reason"
              fullWidth
              label="Reason"
              required
              rows={3}
              multiline
              maxLength={60}
              initalHelpText=""
              value={reason}
              onChange={e => handleInputChange(e, setReason)}
            />
          </div>
        </div>
      </div>

      <div className={classes.bottomSection}>
        <div className={classes.fourPiecesRow}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            variant="outlined"
            required
            value={title}
            onChange={e => handleInputChange(e, setTitle)}
          />
          <TextField
            fullWidth
            label="Working Location"
            variant="outlined"
            name="location"
            required
            value={location}
            onChange={e => handleInputChange(e, setLocation)}
          />
          <TextField
            fullWidth
            label="Department"
            name="department"
            variant="outlined"
            required
            value={department}
            onChange={e => handleInputChange(e, setDepartment)}
          />
          <TextField
            fullWidth
            label="Line Manager"
            name="mentor"
            variant="outlined"
            required
            value={mentor}
            onChange={e => handleInputChange(e, setMentor)}
          />
        </div>

        <div className={classes.twoPiecesRow}>
          <FormControl fullWidth>
            <InputLabel id="province-select-label">Province</InputLabel>
            <Select
              labelId="province-select-label"
              id="demo-simple-select"
              value={provinceKey}
              label="Province"
              onChange={handleProvinceChange}
              required
            >
              {provinces.map(province => (
                <MenuItem key={province.key} value={province.key}>
                  {province.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div style={{ width: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputFormat="yyyy/MM/dd"
                mask="____/__/__"
                label="Birth Date"
                value={date}
                onChange={newValue => {
                  setDate(newValue);
                }}
                renderInput={params => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <ul
          className={`${classes.fourPiecesRow} ${classes.editList} inlineList`}
        >
          <li>
            <TextField
              fullWidth
              label="Hobbies"
              name="hobbies"
              variant="outlined"
              required
              helperText="e.g.: Basketball"
              value={hobbies.value[0]}
              onChange={e =>
                handleInputListChange(e, hobbies.value, setHobbies, 0)
              }
            />
          </li>
          <li>
            <TextField
              fullWidth
              label="Hobbies"
              name="hobbies"
              variant="outlined"
              value={hobbies.value[1]}
              onChange={e =>
                handleInputListChange(e, hobbies.value, setHobbies, 1)
              }
            />
          </li>
          <li>
            <TextField
              fullWidth
              label="Hobbies"
              name="hobbies"
              variant="outlined"
              value={hobbies.value[2]}
              onChange={e =>
                handleInputListChange(e, hobbies.value, setHobbies, 2)
              }
            />
          </li>
          <li>
            <TextField
              fullWidth
              label="Hobbies"
              name="hobbies"
              variant="outlined"
              value={hobbies.value[3]}
              onChange={e =>
                handleInputListChange(e, hobbies.value, setHobbies, 3)
              }
            />
          </li>
        </ul>

        <div className={classes.twoPiecesRow}>
          <ul className={classes.onePieceRow}>
            <li>
              <WordsLimitedTextFiled
                fullWidth
                label="Education Background"
                name="eductaion"
                required
                initalHelpText="e.g.: Spanish, Shanghai industry & commerce foreign language college"
                multiline={true}
                rows={3}
                maxLength={50}
                value={education.value[0]}
                onChange={e =>
                  handleInputListChange(e, education.value, setEducation, 0)
                }
              />
            </li>
            <li>
              <WordsLimitedTextFiled
                fullWidth
                label="Education Background"
                name="eductaion"
                multiline={true}
                rows={3}
                maxLength={50}
                value={education.value[1]}
                onChange={e =>
                  handleInputListChange(e, education.value, setEducation, 1)
                }
              />
            </li>
          </ul>
          <ul className={classes.onePieceRow}>
            <li>
              <WordsLimitedTextFiled
                fullWidth
                label="Past Experience"
                name="experience"
                required
                initalHelpText="e.g.: Sr Visual Designer, Tencent"
                multiline={true}
                rows={3}
                maxLength={60}
                value={exprience.value[0]}
                onChange={e =>
                  handleInputListChange(e, exprience.value, setExprience, 0)
                }
              />
            </li>
            <li>
              <WordsLimitedTextFiled
                fullWidth
                label="Past Experience"
                name="experience"
                multiline={true}
                rows={3}
                maxLength={60}
                value={exprience.value[1]}
                onChange={e =>
                  handleInputListChange(e, exprience.value, setExprience, 1)
                }
              />
            </li>
          </ul>
        </div>
      </div>

      <div className="">
        <Button variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default IntruductionComponent;
