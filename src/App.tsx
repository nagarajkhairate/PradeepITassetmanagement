import React from 'react';
import { Routes, Navigate, Route, BrowserRouter } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import { routes } from './routes';
import { Register, Login } from './routes/AllComponents';
// import checkAuth from './app/auth';

const App = () => {
//   const token = checkAuth();
// console.log((token))
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
          element={<Navigate to={token ? '/' : '/login'} replace />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
