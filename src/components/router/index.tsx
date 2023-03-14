import HomePage from 'pages/HomePage';
import { createBrowserRouter } from 'react-router-dom';
import { rootLoader } from 'components/router/loader/rootLoader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: rootLoader,
  },
]);
export default router;
