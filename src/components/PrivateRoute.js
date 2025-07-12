// src/components/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const currentUser = auth.currentUser;

  // ✅ Check if user is logged in and verified
  if (user && currentUser?.emailVerified) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
