import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import mainLoader from './loader/mainLoader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    loader: mainLoader,
  },
]);

export default router;
