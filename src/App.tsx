import React from 'react';
import { Outlet } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import router from 'router/router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
