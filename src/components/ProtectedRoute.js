
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

