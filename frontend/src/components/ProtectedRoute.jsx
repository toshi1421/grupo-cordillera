import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const getUserRole = (user) => (user?.rol || '').toUpperCase();

const getDefaultRouteByRole = (role) => (role === 'ADMIN' ? '/dashboard' : '/usuario');

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated && !localStorage.getItem('authToken')) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const role = getUserRole(user);
    if (!allowedRoles.includes(role)) {
      return <Navigate to={getDefaultRouteByRole(role)} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;