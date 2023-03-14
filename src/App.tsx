import { RouterProvider } from 'react-router-dom';
import router from 'components/router';
import Layout from 'components/Layout';

function App() {
  return (
    <Layout>
      <RouterProvider router={router}></RouterProvider>
    </Layout>
  );
}

export default App;
