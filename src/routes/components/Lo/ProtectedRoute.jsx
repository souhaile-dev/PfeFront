import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ roles, children }) => {
  const { currentUser, role } = useAuth();

  console.log('Current User:', currentUser);  // Log the current user data
  console.log('Current User Role:', role);    // Log the current user's role
  console.log('Allowed Roles:', roles);       // Log the allowed roles for this route

  // If there's no current user, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If roles are defined and user's role is not included, redirect to 404
  if (roles && !roles.includes(role)) {
    console.log(`Role "${role}" not allowed, redirecting to 404.`);
    return <Navigate to="/404" />;
  }

  // Allow access to the children components if role is allowed
  return children;
};

export default ProtectedRoute;
