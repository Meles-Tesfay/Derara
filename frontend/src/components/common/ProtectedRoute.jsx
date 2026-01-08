import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
      // You might want a spinner here
      return <div className="min-h-screen flex items-center justify-center dark:text-white">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
     // Redirect to appropriate dashboard if logged in but wrong role, or just home
     return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
