import { makeStyles } from '@mui/styles';
import { Button, Typography, Avatar } from '@mui/material';
import { useState, useContext } from 'react';
import { rootContext } from '../rootContext';
import IntruductionComponent from '../dalogContentComp/selfIntru';
import { MonthsEn } from '../../types';
import { formatAreaData } from '../../utils';
import areaData from '../../utils/areaData.json';

const provinces = formatAreaData(areaData, '86');

const useStyles = makeStyles(() => ({
  boradPageEditor: {
    flex: 1,
    padding: '60px',
  },
  lineItem: {
    marginBottom: '24px',
    display: 'flex',
  },

  topSection: {
    marginBottom: '16px',
    borderBottom: '1px solid blue',
  },
  line: {
    display: 'flex',
    marginBottom: '24px',
    alignItems: 'center',
  },
  label: {
    paddingRight: '16px',
  },
}));

const BoradEditor = () => {
  const classes = useStyles();
  const root = useContext(rootContext);

  const [data, setData] = useState<any>({
    photo: '',
    name: '',
    heroPhoto: '',
    selfIntru: '',
    heroName: '',
    reason: '',
    title: '',
    location: '',
    department: '',
    mentor: '',
    provinceKey: '',
    date: '',
    hobbies: [''],
    education: [''],
    exprience: [''],
  });

  const getProvinceVal = (provinceKey: string) => {
    if (!provinceKey) {
      return '';
    }
    return provinces.filter(({ key }) => key === provinceKey)[0].value;
  };

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

  const handleConfirmData = (data: any) => {
    setData(data);
    root.closeDialog();
  };

  const handleClick = () => {
    root.openDialog({
      title: 'add information',
      component: (
        <IntruductionComponent data={data} setData={handleConfirmData} />
      ),
    });
  };

  return (
    <div className={classes.boradPageEditor}>
      <div className={classes.line}>
        <Typography variant="body1" className={classes.label}>
          Phote:{' '}
        </Typography>
        <Avatar alt={data.name} src={data.photo}></Avatar>
      </div>
      <div className={classes.line}>
        <Typography variant="body1" className={classes.label}>
          Name:{' '}
        </Typography>
        <Typography variant="body1">{data.name}</Typography>
      </div>

      <div className={classes.line}>
        <Typography variant="body1" className={classes.label}>
          Brief Self-introduction:{' '}
        </Typography>
        <Typography variant="body1">{data.selfIntru}</Typography>
      </div>

      <div className={classes.line}>
        <Typography variant="body1" className={classes.label}>
          Hero Avatar:{' '}
        </Typography>
        <Avatar alt={data.heroName} src={data.heroPhoto}></Avatar>
      </div>

      <div className={classes.line}>
        <Typography variant="body1" className={classes.label}>
          Your Hero:{' '}
        </Typography>
        <Typography variant="body1">{data.heroName}</Typography>
      </div>

      <div className={classes.line}>
        <Typography variant="body1" className={classes.label}>
          Reason:{' '}
        </Typography>
        <Typography variant="body1">{data.reason}</Typography>
      </div>

      <div className={classes.line}>
        <Typography variant="body1" className={classes.label}>
          Title:{' '}
        </Typography>
        <Typography variant="body1">{data.title}</Typography>
      </div>

      <div className={classes.line}>
        <Typography variant="body1" className={classes.label}>
          Working Location:{' '}
        </Typography>
        <Typography variant="body1">{data.location}</Typography>
      </div>

      <div className={classes.line}>
        <Typography variant="body1" className={classes.label}>
          Department:{' '}
        </Typography>
        <Typography variant="body1">{data.department}</Typography>
      </div>

      <div className={classes.line}>
        <Typography variant="body1" className={classes.label}>
          Line Manager:{' '}
        </Typography>
        <Typography variant="body1">{data.mentor}</Typography>
      </div>

      <div className={classes.line}>
        <Typography variant="body1" className={classes.label}>
          Place Of Birth:{' '}
        </Typography>
        <Typography variant="body1">
          {getProvinceVal(data.provinceKey)} {getBirthday(data.date)}
        </Typography>
      </div>

      <div className={classes.line}>
        <Typography variant="body1" className={classes.label}>
          Hobbies:{' '}
        </Typography>
        {
          <div>
            {data.hobbies.map((item: string) => (
              <Typography variant="body1" key={item}>
                {formatHobbitItem(item)}
              </Typography>
            ))}
          </div>
        }
      </div>

      <div className={classes.line}>
        <Typography variant="body1" className={classes.label}>
          Education Background:{' '}
        </Typography>
        {data.education.map((item: string) => (
          <Typography variant="body1" key={item}>
            {item}
          </Typography>
        ))}
      </div>

      <div className={classes.line}>
        <Typography variant="body1" className={classes.label}>
          Past Experience:{' '}
        </Typography>
        {data.exprience.map((item: string) => (
          <Typography variant="body1" key={item}>
            {item}
          </Typography>
        ))}
      </div>

      <Button variant="contained" onClick={handleClick}>
        Edit Your Profile
      </Button>
    </div>
  );
};

export default BoradEditor;
