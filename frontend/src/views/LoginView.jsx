import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para manejar redirección

// Estilo personalizado para el contenedor del formulario
const FullscreenTableContainer = styled(Paper)({
  height: '35vh',
  width: '20vw',
  margin: 'auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  gap: '16px',
  borderRadius: '30px',
  overflow: 'auto',
  backgroundColor: '#1a1a1a',
});

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3005/auth/login', {
        username,
        password,
      });

      console.log('Response:', response.data);

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        setError('');
        navigate('/principal'); // Redirigir a la ruta principal
      }
    } catch (err) {
      console.error('Error:', err);
      if (err.response) {
        setError(err.response.data.message || 'Credenciales incorrectas');
      } else if (err.request) {
        setError('Error de red, por favor intente más tarde');
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FullscreenTableContainer elevation={3}>
      <Box sx={{ color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>User Login</Typography>
        <Typography variant="body2">Enter your user credentials to login.</Typography>
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          label="Username"
          type="text"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          sx={{
            width: '100%',
            borderRadius: '10px',
            color: 'black',
            '& .MuiInputLabel-root': {
              color: '#FFF',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#FFF', 
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              '& fieldset': {
                borderColor: '#ccc', 
              },
              '&:hover fieldset': {
                borderColor: '#ccc',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#ccc',
              },
              '& .MuiOutlinedInput-input': {
                color: '#FFF',  
              },
            },
          }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          sx={{
            width: '100%',
            borderRadius: '10px',
            color: 'black',
            '& .MuiInputLabel-root': {
              color: '#FFF',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#FFF', 
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              '& fieldset': {
                borderColor: '#ccc', 
              },
              '&:hover fieldset': {
                borderColor: '#ccc',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#ccc',
              },
              '& .MuiOutlinedInput-input': {
                color: '#FFF',  
              },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: '#fff600',
            color: '#000',
            borderRadius: '30px',
            '&:hover': { backgroundColor: '#e6e600' },
          }}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Login'}
        </Button>
      </form>
    </FullscreenTableContainer>
  );
};

export default LoginForm;
