import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

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
  backgroundColor: '#1a1a1a'
});

const LoginForm = () => {
  const [username, setUsername] = useState('');  // Cambié email a username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3005/auth/login', {
        username,  // Usamos username en lugar de email
        password,
      });

      console.log(response.data); 
      setError('');
      
      // Almacenar el token en localStorage si lo devuelve la API
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }

      // Limpiar los campos
      setUsername('');
      setPassword('');
    } catch (err) {
      if (err.response) {
        // El servidor respondió con un error
        setError(err.response.data.message || 'Credenciales incorrectas');
      } else if (err.request) {
        // La solicitud fue realizada, pero no hubo respuesta
        setError('Error de red, por favor intente más tarde');
      } else {
        // Algo ocurrió al configurar la solicitud
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FullscreenTableContainer elevation={3}>
      <Box sx={{ color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <div>
          <h4 style={{ fontWeight: 'bold' }}>User Login</h4>
          <p>Enter your user credentials to login.</p>
        </div>
      </Box>

      {error && <Typography color="error">{error}</Typography>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          label="Username"  // Cambié email a username
          type="text"  // Cambié el tipo a texto
          variant="outlined"
          value={username}  // Usamos username en lugar de email
          onChange={(e) => setUsername(e.target.value)}  // Actualizamos el estado de username
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
              }
            },
          }}
          aria-label="Username"
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
              }
            },
          }}
          aria-label="Password"
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ width: '100%', borderRadius: '30px', backgroundColor: '#fff600', color: '#000' }} 
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Login'}
        </Button>
      </form>
    </FullscreenTableContainer>
  );
};

export default LoginForm;
