// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Ensure this matches the file name exactly

const ProtectedRoute = ({ role: requiredRole, children }) => {
    const { currentUser, role } = useAuth();
  
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
  
    if (requiredRole && role !== requiredRole) {
      return <Navigate to="/404" />;
    }
  
    return children;
  };
  

export default ProtectedRoute;
