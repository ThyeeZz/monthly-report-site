import './App.css';
import RouterProvider from './router';
import RootProvider from './components/rootContext';
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="nav">
        <NavLink to="/" className="link-item">
          Report
        </NavLink>
        <NavLink to="/Board" className="link-item">
          Board
        </NavLink>
      </div>
      <RootProvider>
        <RouterProvider />
      </RootProvider>
    </div>
  );
}

export default App;
