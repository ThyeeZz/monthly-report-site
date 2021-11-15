import './App.css';
import { useScreenShot } from './hooks';
import EditPage from './components/editPage';
import PreviewPage from './components/previewPage';
import RootProvider from './components/rootContent';

function App() {
  return (
    <div className="App">
      <RootProvider>
        <EditPage />
        <PreviewPage />
      </RootProvider>
    </div>
  );
}

export default App;
