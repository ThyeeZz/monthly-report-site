import EditPage from '../editPage';
import PreviewPage from '../previewPage';
import './index.css';

const Report = () => {
  return (
    <div className="report-page-container">
      <EditPage />
      <PreviewPage />
    </div>
  );
};

export default Report;
