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
  overflow: 'auto',
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

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const years = [2024, 2025, 2026];

const FormComponent = () => {
  const [sections, setSections] = useState({});
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [name, setName] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
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
  
    if (!name || !month || !year) {
      valid = false;
      setMessage('Los campos "Name", "Month" y "Year" son obligatorios.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000);
      return;
    }
  
    // Filtramos los registros completos (donde todos los campos requeridos tienen valores)
    const completeRecords = Object.entries(values).filter(([titleId, record]) => {
      const { category, value, country } = record || {};
      const hasAllRequiredValues = category && value && country;
      if (!hasAllRequiredValues) {
        newErrors[titleId] = {
          value: value ? '' : 'Este campo es obligatorio',
          country: country ? '' : 'Este campo es obligatorio',
        };
      }
      return hasAllRequiredValues;
    });
  
    // Si no hay registros completos, mostramos un mensaje de error
    if (completeRecords.length === 0) {
      setErrors(newErrors);
      setMessage('Por favor, complete todos los campos obligatorios.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000);
      return;
    }
  
    setErrors(newErrors); // Actualizar errores en la interfaz
  
    try {
      // Enviar solo registros completos
      for (const [titleId, { category, value, country, currency }] of completeRecords) {
        // Obtener el título de la fila (usando el titleId)
        const item = sections[category].find((item) => item._id === titleId);
        const title = item ? item.title : '';
  
        await axios.post('http://localhost:3005/category', {
          category,
          value,
          title,  // Título de la fila
          country,
          currency: currency || 'USD',
          name,
          month,
          year,
        });
      }
      setMessage('Datos enviados exitosamente.');
      setMessageType('success');
      setValues({}); // Limpiar valores tras el envío
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage('Error al enviar los datos.');
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

      await axios.delete(`http://localhost:3005/category/${titleId}`);
    } catch (error) {
      console.error('Error al eliminar la fila:', error);
    }
  };

  return (
    <FullscreenTableContainer>
      <Container sx={{ display: 'flex', justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" justifyContent="start" sx={{ my: 2, px: 3 }}>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Load Updata</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="end" sx={{ my: 2, px: 3, gap: 1 }}>
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              width: '250px',
              borderRadius: '30px',
              color: 'black',
              backgroundColor: '#fff',
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px',
              },
            }}
            error={!!message && !name}
          />

          <Box align="center" sx={{display: 'flex', width: '400px', justifyContent: 'space-around'}}>
            <Select
            label="Month"
            variant="outlined"
            size="small"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            sx={{ width: 150, borderRadius: 30 }}
            error={!!message && !month}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>

            <Select
              label="Year"
              variant="outlined"
              size="small"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              sx={{ width: 150, borderRadius: 30 }}
              error={!!message && !year}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Container>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {Object.keys(sections).map((category) => (
          <div key={category}>
            <Typography sx={{ p: 1, mt: 2, fontWeight: 'bold', display: 'flex', justifyContent: 'center', backgroundColor: '#FFF600', color: '#1a1a1a', borderRadius: '30px' }}>
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
                        size="small"
                        onChange={(e) => handleInputChange(category, 'value', e.target.value, item._id)}
                        error={!!errors[item._id]?.value}
                        helperText={errors[item._id]?.value}
                        sx={{
                          width: '100%',
                          borderRadius: '30px',
                          color: 'black',
                          backgroundColor: '#fff',
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
                        size="small"
                        defaultValue={item.country || ""}
                        onChange={(e) => handleInputChange(category, 'country', e.target.value, item._id)}
                        error={!!errors[item._id]?.country}
                        sx={{borderRadius: '30px'}}
                      >
                        <MenuItem value="Estados Unidos">Estados Unidos</MenuItem>
                        <MenuItem value="Mexico">México</MenuItem>
                        <MenuItem value="Peru">Perú</MenuItem>
                        <MenuItem value="Argentina">Argentina</MenuItem>
                        <MenuItem value="Chile">Chile</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      <Select
                        fullWidth
                        variant="outlined"
                        size="small"
                        defaultValue={item.currency || "USD"}
                        onChange={(e) => handleInputChange(category, 'currency', e.target.value, item._id)}
                        sx={{borderRadius: '30px'}}
                      > 
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="MXN">MXN</MenuItem>
                        <MenuItem value="PEN">PEN</MenuItem>
                        <MenuItem value="ARS">ARS</MenuItem>
                        <MenuItem value="CLP">CPL</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleDeleteRow(item._id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" onClick={handleSubmit} sx={{ width: '200px', borderRadius: '30px', backgroundColor: '#fff600', color: '#000' }}>
          Enviar
        </Button>
      </Box>
      {message && (
        <MessageContainer messageType={messageType}>
          <Typography variant="body1" sx={{ color: '#1a1a1a' }}>{message}</Typography>
        </MessageContainer>
      )}
    </FullscreenTableContainer>
  );
};

export default FormComponent;
