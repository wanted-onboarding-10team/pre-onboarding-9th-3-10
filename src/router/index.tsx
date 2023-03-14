import mainLoader from 'router/loader/mainLoader';
import { createBrowserRouter } from 'react-router-dom';
import App from 'App';
import Main from 'page/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: mainLoader,
    children: [
      {
        path: '',
        element: <Main />,
      },
    ],
  },
]);
export default router;
