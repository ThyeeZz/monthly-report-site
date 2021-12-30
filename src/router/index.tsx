import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom';
import Report from '../pages/report';
import Board from '../pages/board';

const RouterProvider = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Report />} />
        <Route path="borad" element={<Board />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
};

export default RouterProvider;
