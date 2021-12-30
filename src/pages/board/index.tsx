import BoardEditor from '../../components/board-edit';
import BoardPreview from '../../components/board-preview';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { IInfoType } from '../../types';
import { screenShoot } from '../../utils';

const useStyles = makeStyles(() => ({
  boardPageContainer: {
    maxWidth: '1440px',
    margin: '0 auto',
    alignItems: 'stretch',

    '& .preview-card': {
      marginBottom: '40px',
    },
  },
}));

const Board = () => {
  const classes = useStyles();
  const [data, setData] = useState<IInfoType[]>([
    {
      photo: '',
      name: 'Zhangsan',
      heroPhoto: '',
      selfIntru:
        'My name is Zhangsan, and everyone likes to call me Saner. I usually like to play video games during my rest time.',
      heroName: 'Greta Grewig',
      reason: 'Excellent storyteller with a sense of humor',
      title: 'Software Engineer',
      location: 'Shanghai',
      department: 'Image Search',
      mentor: 'Lisi',
      province: '北京市',
      date: new Date(),
      hobbies: ['Basketball', 'Basketball', 'Basketball', 'Basketball'],
      education: [
        'Spanish, Shanghai industry & commerce foreign language college',
        'Spanish, Shanghai industry & commerce foreign language college',
      ],
      exprience: [
        'Sr Visual Designer, Tencent',
        'Sr Visual Designer, Frog Design',
      ],
    },
  ]);

  const handleSave = () => {
    const cardEleList = document.querySelectorAll('.preview-card');
    cardEleList.forEach(async (ele, index) => {
      const src = await screenShoot(ele as HTMLElement);
      const aEle = document.createElement('a');
      aEle.href = src.replace('image/png', 'image/octet-stream');
      aEle.download = `${data[index].name}.png`;
      aEle.click();
    });
  };

  return (
    <div className={classes.boardPageContainer}>
      <BoardEditor sendData={setData} handleSave={handleSave} />

      {data.map(v => (
        <div className="preview-card" key={v.name}>
          <BoardPreview data={v} />
        </div>
      ))}
    </div>
  );
};

export default Board;
