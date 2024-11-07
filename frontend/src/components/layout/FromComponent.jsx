import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
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

const FullscreenTableContainer = styled(TableContainer)({
  height: '70vh',
  width: '80vw',
  margin: 'auto',
  borderRadius: '30px',
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
  const [porcentajeAplicado, setPorcentajeAplicado] = useState('');
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
    <FullscreenTableContainer component={Paper} sx={{ backgroundColor: 'A300', borderRadius: '30px' }}>
      <Box display="flex" alignItems="center" justifyContent="end" sx={{ my: 2, px: 3 }}>
        <TextField
          label="Porcentaje Aplicado"
          variant="outlined"
          size="small"
          value={porcentajeAplicado}
          onChange={(e) => setPorcentajeAplicado(e.target.value)}
          sx={{ width: '200px' }}
        />
        <TextField
          label="Name"
          variant="outlined"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: '200px', ml: 2 }}
        />
      </Box>
      {Object.keys(sections).map((category) => (
        <div key={category}>
          <Typography sx={{ p: 1, fontWeight: 'bold', display: 'flex', backgroundColor: '#fff600', color: '#000' }}>
            {category.toUpperCase()}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>Título</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>Valor</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>Country</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>Currency</TableCell>
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
                      size="small"
                      onChange={(e) => handleInputChange(category, 'title', e.target.value, item._id)}
                      error={!!errors[item._id]?.title}
                      helperText={errors[item._id]?.title}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      fullWidth
                      variant="outlined"
                      size="small"
                      defaultValue=""
                      onChange={(e) => handleInputChange(category, 'country', e.target.value, item._id)}
                      error={!!errors[item._id]?.country}
                    >
                      <MenuItem value="Estados Unidos">Estados Unidos</MenuItem>
                      <MenuItem value="Mexico">México</MenuItem>
                      <MenuItem value="Peru">Perú</MenuItem>
                      <MenuItem value="Chile">Chile</MenuItem>
                      <MenuItem value="Argentina">Argentina</MenuItem>
                    </Select>
                    {errors[item._id]?.country && (
                      <Typography variant="caption" color="error">{errors[item._id]?.country}</Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      fullWidth
                      variant="outlined"
                      size="small"
                      defaultValue="USD"
                      onChange={(e) => handleInputChange(category, 'currency', e.target.value, item._id)}
                    >
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="MXN">MXN</MenuItem>
                      <MenuItem value="EUR">EUR</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDeleteRow(item._id)}>
                      <DeleteIcon color="#fff59d" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
      <Box display="flex" justifyContent="center" my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ borderRadius: '20px', padding: '12px 20px', fontSize: '16px', backgroundColor: '#fff600', color: '#000' }}
        >
          Enviar
        </Button>
      </Box>
      {message && (
        <MessageContainer messageType={messageType}>
          <Typography variant="body2" sx={{ color: '#fff' }}>
            {message}
          </Typography>
        </MessageContainer>
      )}
    </FullscreenTableContainer>
  );
};

export default FormComponent;
