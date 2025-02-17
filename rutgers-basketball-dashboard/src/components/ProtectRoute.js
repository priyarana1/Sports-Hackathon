import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ lin}) => {
  const token = localStorage.getItem('authToken');
  return token ? lin : <Navigate to="/login" replace />;
};

export default ProtectRoute;