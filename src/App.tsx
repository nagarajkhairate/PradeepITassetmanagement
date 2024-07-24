import React from 'react';
import { Routes, Navigate, Route, BrowserRouter } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import { routes } from './routes';
import { CreateAccount, LoginAccount } from './routes/AllComponents';
import checkAuth from './app/auth';

const App = () => {
  // const token = checkAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginAccount />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>
        {/* <Route
          path="*"
          element={<Navigate to={token ? '/' : '/login'} replace />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
