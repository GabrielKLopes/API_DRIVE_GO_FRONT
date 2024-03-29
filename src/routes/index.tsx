
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Home from '../pages/home';
import UserTable from '../components/User';
import SharedTableGet from '../components/tableShared';

const LoginRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/register/user" element={<Register/>} />
      <Route path="/session/user" element={<UserTable/>} />
      <Route path="/session/shared" element={<SharedTableGet/>} />
    </Routes>
  );
};

export default LoginRoutes;
