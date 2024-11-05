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
} from '@mui/material';
import { styled } from '@mui/system';

const FullscreenTableContainer = styled(TableContainer)({
  height: '70vh',
  width: '80vw',
  margin: 'auto',
});

const FormComponent = () => {
  const [categories, setCategories] = useState({});
  const [values, setValues] = useState({});
  const [porcentajeAplicado, setPorcentajeAplicado] = useState('');

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await axios.get('http://localhost:3005/generaltables');
        
        const groupedData = response.data.reduce((acc, item) => {
          acc[item.category] = acc[item.category] || [];
          acc[item.category].push(item);
          return acc;
        }, {});
        
        setCategories(groupedData);
      } catch (error) {
        console.error('Error fetching titles:', error);
      }
    };

    fetchTitles();
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
  };

  const handleSubmit = async () => {
    try {
      for (const titleId in values) {
        const { category, title, country, currency } = values[titleId];
        
        // Enviar cada título como un registro separado
        await axios.post('http://localhost:3005/generaltables', {
          category,
          title,
          country,
          currency: currency || 'USD', // Asignar USD por defecto si está vacío
        });
      }
      console.log('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <FullscreenTableContainer component={Paper} sx={{ backgroundColor:'primary.main' , borderRadius: '30px' }} >
      <Box display="flex" alignItems="center" justifyContent="end" sx={{ my: 2, px: 3 }}>
        <TextField
          label="Porcentaje Aplicado"
          variant="outlined"
          size="small"
          value={porcentajeAplicado}
          onChange={(e) => setPorcentajeAplicado(e.target.value)}
          sx={{ width: '200px' }}
        />
      </Box>
      {Object.keys(categories).map((category) => (
        <div key={category}>
          <Typography sx={{p:1, fontWeight: 'bold',display:'flex', backgroundColor:'#ccc' }}>
           {category.toUpperCase()}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>Título</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>Valor</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>Country</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>Currency</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories[category].map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="center">{item.title}</TableCell>
                  <TableCell align="center">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      onChange={(e) => handleInputChange(category, 'title', e.target.value, item._id)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      fullWidth
                      variant="outlined"
                      size="small"
                      defaultValue=""
                      onChange={(e) => handleInputChange(category, 'country', e.target.value, item._id)}
                    >
                      <MenuItem value="Estados Unidos">Estados Unidos</MenuItem>
                      <MenuItem value="Mexico">México</MenuItem>
                      <MenuItem value="Peru">Perú</MenuItem>
                      <MenuItem value="Chile">Chile</MenuItem>
                      <MenuItem value="Argentina">Argentina</MenuItem>
                    </Select>
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
                      <MenuItem value="SOLES">SOLES</MenuItem>
                      <MenuItem value="Peso Mexicano">Peso Mexicano</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3, width: '200px', borderRadius: '20px', backgroundColor: '#fff600', color: '#000', outline: 'none', border: 'none' }}
      >
        Enviar
      </Button>
    </FullscreenTableContainer>
  );
};

export default FormComponent;
