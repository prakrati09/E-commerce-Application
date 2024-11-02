// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ element }) => {
  const { username } = useAuth();  // Fetch username from AuthContext
  return username ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
