import MainPage from 'pages/MainPage';
import { createBrowserRouter } from 'react-router-dom';
import mainLoader from './loader/mainLoader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    loader: mainLoader,
  },
]);

export default router;
