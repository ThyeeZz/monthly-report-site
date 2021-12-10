import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { useState, useContext, useRef } from 'react';
import { rootContext } from '../rootContext';
import IntruductionComponent from '../dalogContentComp/selfIntru';
import { handleReadInfoFile } from '../../utils';
import { IInfoType, IInfoFromFeishu } from '../../types';

const useStyles = makeStyles(() => ({
  boradPageEditor: {
    flex: 1,
    padding: '60px 0',
    display: 'flex',
  },
  btn: {
    marginRight: '24px',
  },
  hidden: {
    visibility: 'hidden',
    opacity: 0,
    position: 'absolute',
    zIndex: -1,
  },
}));

interface PropsType {
  sendData: React.Dispatch<React.SetStateAction<IInfoType[]>>;
  handleSave: () => void;
}
const BoradEditor = (props: PropsType) => {
  const classes = useStyles();
  const root = useContext(rootContext);
  const { sendData, handleSave } = props;
  const uploader = useRef<HTMLInputElement>(null!);

  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState<IInfoType>({
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
    province: '',
    date: null,
    hobbies: [''],
    education: [''],
    exprience: [''],
  });

  const handleConfirmData = (data: any) => {
    setData(data);
    sendData(data);
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

  const handleBatchImport = () => {
    uploader.current.click();
  };

  const dataConvert = (fromList: IInfoFromFeishu[]): void => {
    const infoList = fromList.map((from: IInfoFromFeishu) => {
      const hobbies: string[] = [];
      const education: string[] = [];
      const exprience: string[] = [];
      setDisabled(true);

      Object.keys(from).forEach(key => {
        if (key.includes('Hobbies')) {
          hobbies.push(from[key as keyof IInfoFromFeishu]);
        }
        if (key.includes('Past Experience')) {
          exprience.push(from[key as keyof IInfoFromFeishu]);
        }
        if (key.includes('Education Background')) {
          education.push(from[key as keyof IInfoFromFeishu]);
        }
      });

      return {
        photo: from['Photo'],
        name: from['Name'],
        heroPhoto: from['Hero Avatar'],
        selfIntru: from['Brief Self-introduction'],
        heroName: from['Hero Name'],
        reason: from['Reason'],
        title: from['Title'],
        location: from['Working Location'],
        department: from['Department'],
        mentor: from['Line Manager'],
        province: from['Place Of Birth'],
        date: new Date(from['Birthday']),
        hobbies,
        education,
        exprience,
      };
    });

    sendData(infoList);
  };

  return (
    <div className={classes.boradPageEditor}>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={e => {
          handleReadInfoFile(e, dataConvert);
        }}
        className={classes.hidden}
        ref={uploader}
      />

      <div className={classes.btn}>
        <Button variant="contained" onClick={handleBatchImport}>
          Batch Import
        </Button>
      </div>

      <div className={classes.btn}>
        <Button
          variant="contained"
          onClick={handleClick}
          className={classes.btn}
          disabled={disabled}
        >
          Edit Your Profile
        </Button>
      </div>

      <div>
        <Button variant="outlined" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default BoradEditor;
