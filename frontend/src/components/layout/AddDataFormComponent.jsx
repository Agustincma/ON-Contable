import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';

const FullscreenContainer = styled(Paper)({
  height: '70vh',
  width: '50vw',
  margin: 'auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  borderRadius: '30px',
});

const FormComponent = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.category || !formData.title) {
      setMessage('Todos los campos son requeridos');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000); 
      return;
    }

    try {
      await axios.post('http://localhost:3005/sections', {
        category: formData.category,
        title: formData.title,
        country: 'USA',
        currency: 'USD',
      });
      
      setMessage('Categoria y Titulo agregados correctamente.');
      setMessageType('success');
      setFormData({ category: '', title: '' });
      setTimeout(() => setMessage(''), 5000); 
    } catch (error) {
      // Maneja errores, como el caso de duplicado
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.message); 
      } else {
        setMessage('Error al enviar');
      }
      setMessageType('error');
      setTimeout(() => setMessage(''), 2000); 
    }
  };

  return (
    <FullscreenContainer sx={{ backgroundColor: 'primary.main' }}>
      <Typography variant='h5' sx={{fontWeight: 'bold'}}>Add category and title</Typography>
      <TextField
        id="outlined-category"
        label="Category"
        variant="outlined"
        fullWidth
        value={formData.category}
        onChange={(e) => handleInputChange('category', e.target.value)}
        error={!formData.category && messageType === 'error'} 
      />
      <TextField
        id="outlined-title"
        label="Title"
        variant="outlined"
        fullWidth
        value={formData.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
        error={!formData.title && messageType === 'error'} 
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{
          width: '200px',
          borderRadius: '20px',
          backgroundColor: '#fff600',
          color: '#000',
          outline: 'none',
          border: 'none',
        }}
      >
        Enviar
      </Button>
      {message && (
        <Container
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            width: '400px',
            height: '50px',
            borderRadius: '8px',
            backgroundColor: messageType === 'success' ? '#00ff40' : '#ff4c4c', 
          }}
        >
          <Typography variant="body1" sx={{ color: '#fff' }}>
            {message}
          </Typography>
        </Container>
      )}
    </FullscreenContainer>
  );
};

export default FormComponent;
