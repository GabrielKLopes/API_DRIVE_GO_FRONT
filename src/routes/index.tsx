// routes/Login.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';

const LoginRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register/user" element={<Register/>} />
    </Routes>
  );
};

export default LoginRoutes;
