import mainLoader from 'router/loader/mainLoader';
import { createBrowserRouter } from 'react-router-dom';
import App from 'App';
import Main from 'components/Main';
import MainPage from 'page/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    loader: mainLoader,
  },
]);
export default router;
