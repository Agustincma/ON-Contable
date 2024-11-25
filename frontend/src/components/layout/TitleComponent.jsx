import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TitleComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('authToken');

    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        borderBottom: '2px solid #fff600',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        TitleComponent
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        sx={{
          backgroundColor: '#fff600',
          color: '#000',
          '&:hover': { backgroundColor: '#e6e600' },
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default TitleComponent;
