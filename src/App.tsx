import './App.css';
import RouterProvider from './router';
import RootProvider from './components/rootContent';
import { useLocation, NavLink } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <div className="nav">
        <NavLink to="/" className="link-item">
          Report
        </NavLink>
        <NavLink to="/Borad" className="link-item">
          Borad
        </NavLink>
      </div>
      <RootProvider>
        <RouterProvider />
      </RootProvider>
    </div>
  );
}

export default App;
