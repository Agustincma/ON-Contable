import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/system';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import AccordionGroup from '@mui/joy/AccordionGroup';

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
  overflowY: 'auto', // This allows vertical scrolling when content overflows
});

const FormComponent = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [categories, setCategories] = useState([]);
  const [titles, setTitles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3005/sections/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch all titles without depending on selected category
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await axios.get('http://localhost:3005/sections/'); // Assume this is the endpoint for all titles
        setTitles(response.data);
      } catch (error) {
        console.error('Error fetching titles', error);
      }
    };

    fetchTitles();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTitleChange = (event) => {
    setSelectedTitle(event.target.value);
  };

  const handleAddSubmit = async () => {
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
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error al enviar');
      }
      setMessageType('error');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!selectedCategory) {
      setMessage('Selecciona una categoría para eliminar');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      await axios.delete(`http://localhost:3005/sections-category/${selectedCategory}`);

      setMessage('Categoría eliminada correctamente.');
      setMessageType('success');
      setSelectedCategory('');
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage('Error al eliminar la categoría');
      setMessageType('error');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleCategoryTitleDeleteSubmit = async () => {
    if (!selectedCategory || !selectedTitle) {
      setMessage('Selecciona una categoría y un título para eliminar');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      await axios.delete(`http://localhost:3005/sections-category/${selectedCategory}/${selectedTitle}`);

      setMessage('Categoría y título eliminados correctamente.');
      setMessageType('success');
      setSelectedCategory('');
      setSelectedTitle('');
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage('Error al eliminar la categoría y título');
      setMessageType('error');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <FullscreenContainer>
      <Typography variant='h5' sx={{ fontWeight: 'bold', marginTop: '30px' }}>Manage Categories</Typography>
      <AccordionGroup sx={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '20px'}}>
        {/* Add Category Accordion */}
        <Accordion sx={{ width: '100%' }}>
          <AccordionSummary>Add Category and Title</AccordionSummary>
          <AccordionDetails sx={{ marginTop: '20px' }}>
            <TextField
              id="outlined-category"
              label="Category"
              variant="outlined"
              fullWidth
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              error={!formData.category && messageType === 'error'}
              sx={{
                width: '100%',
                borderRadius: '30px',
                display: 'flex',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                },
              }}
            />
            <TextField
              id="outlined-title"
              label="Title"
              variant="outlined"
              fullWidth
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              error={!formData.title && messageType === 'error'}
              sx={{
                width: '100%',
                marginTop: '20px',
                borderRadius: '30px',
                display: 'flex',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                },
              }}
            />
            <Button
              onClick={handleAddSubmit}
              variant="contained"
              color="primary"
              sx={{
                width: '200px',
                borderRadius: '30px',
                backgroundColor: '#fff600',
                color: '#000',
                marginTop: '20px',
                alignSelf: 'center',
              }}
            >
              Enviar
            </Button>
          </AccordionDetails>
        </Accordion>

        {/* Delete Category Accordion */}
        <Accordion sx={{ width: '100%' }}>
          <AccordionSummary>Eliminar Categoria</AccordionSummary>
          <AccordionDetails sx={{ marginTop: '20px' }}>
            <FormControl fullWidth>
              <InputLabel>Selecciona una categoría</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Selecciona una categoría"
                sx={{
                  width: '100%',
                  borderRadius: '30px',
                  display: 'flex',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '30px',
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.category}>
                    {category.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleDeleteSubmit}
              variant="contained"
              color="error"
              sx={{
                width: '200px',
                borderRadius: '30px',
                backgroundColor: '#f44336',
                color: '#fff',
                marginTop: '20px',
                alignSelf: 'center',
              }}
            >
              Eliminar
            </Button>
          </AccordionDetails>
        </Accordion>

        {/* Delete Category and Title Accordion */}
        <Accordion sx={{ width: '100%' }}>
          <AccordionSummary>Eliminar Categoria y Titulo</AccordionSummary>
          <AccordionDetails sx={{ marginTop: '20px' }}>
            <FormControl fullWidth>
              <InputLabel>Selecciona una categoría</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Selecciona una categoría"
                sx={{
                  width: '100%',
                  borderRadius: '30px',
                  display: 'flex',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '30px',
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.category}>
                    {category.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: '20px' }}>
              <InputLabel>Selecciona un título</InputLabel>
              <Select
                value={selectedTitle}
                onChange={handleTitleChange}
                label="Selecciona un título"
                sx={{
                  width: '100%',
                  borderRadius: '30px',
                  display: 'flex',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '30px',
                  },
                }}
              >
                {titles.map((title) => (
                  <MenuItem key={title.id} value={title.title}>
                    {title.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleCategoryTitleDeleteSubmit}
              variant="contained"
              color="error"
              sx={{
                width: '200px',
                borderRadius: '30px',
                backgroundColor: '#f44336',
                color: '#fff',
                marginTop: '20px',
                alignSelf: 'center',
              }}
            >
              Eliminar
            </Button>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>

      {/* Display messages */}
      {message && (
        <Typography
          variant="body1"
          color={messageType === 'error' ? 'error' : 'success'}
          sx={{ marginTop: '20px', textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
    </FullscreenContainer>
  );
};

export default FormComponent;
