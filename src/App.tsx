import './App.css';
import EditPage from './pages/editPage';
import PreviewPage from './pages/previewPage';
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
