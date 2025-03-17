import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user'); // Simulating authentication
  console.log('Is Authenticated:', isAuthenticated); // Debugging line

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
