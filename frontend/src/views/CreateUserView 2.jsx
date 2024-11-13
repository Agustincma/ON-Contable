import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Box, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// Estilo personalizado para el contenedor del formulario
const FullscreenTableContainer = styled(Paper)({
  height: '45vh',
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

const CreateUserView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');  // Estado para el rol
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username:", username); // Verifica que el nombre de usuario es correcto
    console.log("Password:", password); // Verifica que la contraseña es correcta
    console.log("Role:", role); // Verifica que el rol es correcto
  
    try {
      const response = await axios.post('http://localhost:3005/auth/create', { 
        username,
        password,
        role,  // Incluir el rol en el envío del formulario
      });
      console.log(response.data);
      setError('');
  
      // Si el registro es exitoso, redirigimos al login o dashboard
      navigate('/login');
    } catch (err) {
      console.error(err);  // Verifica el error exacto
      setError('Error al registrar usuario');
    }
  };
  
  return (
    <FullscreenTableContainer elevation={3}>
      <Box sx={{ color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <div>
          <h4 style={{ fontWeight: 'bold' }}>Create a New User</h4>
          <p>Enter your details to create a new account.</p>
        </div>
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
        
        {/* Campo de selección para el rol */}
        <TextField
          label="Role"
          select
          variant="outlined"
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
        >
          <MenuItem value="admin">admin</MenuItem>
          <MenuItem value="normal">normal</MenuItem>
        </TextField>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ width: '100%', borderRadius: '30px', backgroundColor: '#fff600', color: '#000' }}>
          Create Account
        </Button>
      </form>
    </FullscreenTableContainer>
  );
};

export default CreateUserView;
