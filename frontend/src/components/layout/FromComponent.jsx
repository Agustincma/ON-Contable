import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  Select,
  Box,
  IconButton,
  Container
} from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';

// Estilos para el contenedor principal, actualizado para ocupar todo el contenedor y manejar el overflow
const FullscreenTableContainer = styled(Paper)({
  height: '70vh',
  width: '80vw',
  margin: 'auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  gap: '16px',
  borderRadius: '30px',
  overflow: 'auto', // Habilita el desplazamiento si el contenido es más grande que el contenedor
});

const MessageContainer = styled(Container)(({ theme, messageType }) => ({
  mt: 2,
  mb: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  width: '400px',
  height: '50px',
  borderRadius: '8px',
  backgroundColor: messageType === 'success' ? '#00ff40' : '#ff4c4c',
}));

const FormComponent = () => {
  const [sections, setSections] = useState({});
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:3005/sections');
        const groupedData = response.data.reduce((acc, item) => {
          acc[item.category] = acc[item.category] || [];
          acc[item.category].push(item);
          return acc;
        }, {});
        setSections(groupedData);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

  const handleInputChange = (category, field, value, titleId) => {
    setValues((prevValues) => ({
      ...prevValues,
      [titleId]: {
        ...prevValues[titleId],
        category,
        [field]: value,
      },
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [titleId]: {
        ...prevErrors[titleId],
        [field]: value ? '' : 'Este campo es obligatorio',
      },
    }));
  };

  const handleSubmit = async () => {
    let valid = true;
    const newErrors = {};
  
    // Verificar si el campo 'name' está vacío
    if (!name) {
      valid = false;
      setMessage('El campo "Name" es obligatorio.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000); 
    }
  
    // Verificar si todas las columnas (excepto currency) tienen valores
    for (const titleId in values) {
      const { title, country } = values[titleId];
      newErrors[titleId] = {};
  
      // Validación de campos
      if (!title) {
        newErrors[titleId].title = 'Este campo es obligatorio';
        valid = false;
      }
      if (!country) {
        newErrors[titleId].country = 'Este campo es obligatorio';
        valid = false;
      }
    }
  
    setErrors(newErrors);
  
    if (valid) {
      try {
        for (const titleId in values) {
          const { category, title, country, currency } = values[titleId];
          await axios.post('http://localhost:3005/generaltables', {
            category,
            title,
            country,
            currency: currency || 'USD',
            name: name,
          });
        }
        setMessage('Datos enviados exitosamente.');
        setMessageType('success');
        setTimeout(() => setMessage(''), 5000); 
      } catch (error) {
        setMessage('Error al enviar los datos.');
        setMessageType('error');
        setTimeout(() => setMessage(''), 5000); 
      }
    } else {
      setMessage('Por favor, complete todos los campos obligatorios.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000); 
    }
  };
  

  const handleDeleteRow = async (titleId) => {
    try {
      setValues((prevValues) => {
        const newValues = { ...prevValues };
        delete newValues[titleId];
        return newValues;
      });

      setSections((prevSections) => {
        const newSections = { ...prevSections };
        for (let category in newSections) {
          newSections[category] = newSections[category].filter((item) => item._id !== titleId);
        }
        return newSections;
      });

      await axios.delete(`http://localhost:3005/generaltables/${titleId}`);
    } catch (error) {
      console.error('Error al eliminar la fila:', error);
    }
  };

  return (
    <FullscreenTableContainer>
      <Container sx={{display: 'flex', justifyContent: "space-between",alignContent: 'space-between', width:'100%' }}>
        <Box display="flex" alignItems="center" justifyContent="start" sx={{ my: 2, px: 3 }}>
          <Typography variant='h5' sx={{fontWeight: 'bold'}}>Load Updata</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="end" sx={{ my: 2, px: 3 }}>
          <TextField
            label="Name"
            variant="outlined"
            color="black"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              width: '200px',
              borderRadius: '30px',
              display:'flex',
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px',
              },
            }}
            error={!!message && !name} 
          />
        </Box>

      </Container>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {Object.keys(sections).map((category) => (
          <div key={category}>
            <Typography sx={{ p: 1, fontWeight: 'bold', display: 'flex', justifyContent: 'center', backgroundColor: '#FFF600', color: '#1a1a1a', borderRadius: '30px' }}>
              {category.toUpperCase()}
            </Typography>
            <Table>
  <TableHead>
    <TableRow>
      <TableCell align="center" style={{ fontWeight: 'bold', width: '300px' }}>Título</TableCell>
      <TableCell align="center" style={{ fontWeight: 'bold', width: '300px' }}>Valor</TableCell>
      <TableCell align="center" style={{ fontWeight: 'bold', width: '300px' }}>Country</TableCell>
      <TableCell align="center" style={{ fontWeight: 'bold', width: '300px' }}>Currency</TableCell>
      <TableCell align="center" style={{ fontWeight: 'bold' }}>Acción</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {sections[category].map((item) => (
      <TableRow key={item._id}>
        <TableCell align="center">{item.title}</TableCell>
        <TableCell align="center">
          <TextField
            fullWidth
            variant="outlined"
            color='black'
            size="small"
            onChange={(e) => handleInputChange(category, 'title', e.target.value, item._id)}
            error={!!errors[item._id]?.title}
            helperText={errors[item._id]?.title}
            sx={{
              borderRadius: '30px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px',
              },
            }}
          />
        </TableCell>
        <TableCell align="center">
          <Select
            fullWidth
            variant="outlined"
            color='black'
            size="small"
            defaultValue={item.country || ""}
            onChange={(e) => handleInputChange(category, 'country', e.target.value, item._id)}
            error={!!errors[item._id]?.country}
            sx={{borderRadius: '30px'}}
          >
            <MenuItem value="Estados Unidos">Estados Unidos</MenuItem>
            <MenuItem value="Mexico">México</MenuItem>
            <MenuItem value="Peru">Perú</MenuItem>
            <MenuItem value="Colombia">Colombia</MenuItem>
            <MenuItem value="Argentina">Argentina</MenuItem>
            <MenuItem value="Chile">Chile</MenuItem>
          </Select>
        </TableCell>
        <TableCell align="center">
          <Select
            fullWidth
            variant="outlined"
            size="small"
            value={values[item._id]?.currency || 'USD'}
            onChange={(e) => handleInputChange(category, 'currency', e.target.value, item._id)}
            error={!!errors[item._id]?.currency}
            sx={{borderRadius: '30px'}}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="MXN">MXN</MenuItem>
            <MenuItem value="PEN">PEN</MenuItem>
            <MenuItem value="COP">COP</MenuItem>
          </Select>
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => handleDeleteRow(item._id)} color="error">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

          </div>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          color="primary"
          sx={{ width: '200px', borderRadius: '30px', backgroundColor: '#fff600', color: '#000' }}
        >
          Enviar
        </Button>
      </Box>

      {message && (
        <MessageContainer messageType={messageType}>
          <Typography variant="body1" sx={{color: '#fff'}}>{message}</Typography>
        </MessageContainer>
      )}
    </FullscreenTableContainer>
  );
};

export default FormComponent;


{/* <TextField
label="Porcentaje Aplicado"
variant="outlined"
size="small"
value={porcentajeAplicado}
onChange={(e) => setPorcentajeAplicado(e.target.value)}
sx={{ width: '200px' }}
/> */}