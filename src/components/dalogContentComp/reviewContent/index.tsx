import { Button } from '@mui/material';
import { useContext } from 'react';
import { rootContext } from '../../rootContent';

type PropType = {
  src: string;
  month: string;
};

const ReviewCotent: React.FC<PropType> = ({ src, month }) => {
  const root = useContext(rootContext);

  const handleDownload = () => {
    const { closeDialog } = root;
    const aEle = document.createElement('a');
    aEle.href = src.replace('image/png', 'image/octet-stream');
    aEle.download = `${month}月报.png`;
    aEle.click();
    closeDialog();
  };
  return (
    <div>
      <img src={src} alt={`${month}月报`} style={{ marginBottom: '24px' }} />
      <br />
      <Button variant="contained" onClick={handleDownload}>
        SAVE
      </Button>
    </div>
  );
};

export default ReviewCotent;
