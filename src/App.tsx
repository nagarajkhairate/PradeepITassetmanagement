import React from 'react';
import { Routes, Navigate, Route, BrowserRouter } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import { routes } from './routes';
import checkAuth from './app/auth';
import { Register, Login } from './routes/AllComponents';
const App = () => {
  // const token = checkAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>
        {/* <Route
          path="*"
          element={<Navigate to={token ? '/dashboard' : '/login'} replace />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
