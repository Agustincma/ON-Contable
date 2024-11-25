import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Verificamos si hay un token de autenticación en localStorage
  const token = localStorage.getItem('authToken');

  // Si no hay token, redirigimos al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, mostramos la ruta protegida (Outlet renderiza el contenido de la ruta)
  return <Outlet />;
};

export default PrivateRoute;
