import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

const AuthRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/" /> : children;
};

export default AuthRoute;
