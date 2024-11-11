import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

// Estilos personalizados para la tabla
const FullscreenContainer = styled(Paper)({
  height: '70vh',
  width: '80vw',
  margin: 'auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  borderRadius: '30px',
});

const PercentageTable = () => {
  const [data, setData] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [year, setYear] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Obtener los datos del endpoint cuando se cargue el componente
    axios.get('http://localhost:3005/category/')
      .then(response => {
        // Verificar que la respuesta tenga la estructura esperada
        if (Array.isArray(response.data)) {
          setData(response.data);
          setFilteredData(response.data); // Al principio mostramos todos los datos
        } else {
          console.error('Data format is incorrect', response.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);
  const uniqueYears = Array.from(new Set(data.map(item => item.year)));

  const handleFilterYear = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
    if (selectedYear) {
      setFilteredData(data.filter(item => item.year === selectedYear));
    } else {
      setFilteredData(data); // Mostrar todos los años si no hay filtro
    }
  };

  const handleApplyPercentage = () => {
    const updatedData = filteredData.map((item) => {
      // Verificamos si "value" existe y es un número
      if (item.value && !isNaN(item.value)) {
        let newValue = item.value;
        const updatedMonths = monthsOrder.map((monthName, index) => {
          if (index === 0) {
            // El primer mes (Enero) se calcula directamente
            newValue += (newValue * percentage) / 100;
          } else {
            // Los demás meses se calculan sobre el mes anterior
            newValue += (newValue * percentage) / 100;
          }
          return newValue.toFixed(2);
        });

        return { ...item, months: updatedMonths };
      } else {
        // Si el valor no es válido, retornamos el item original
        return item;
      }
    });
    setFilteredData(updatedData);
  };

  // Definición de los meses en el orden correcto
  const monthsOrder = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const handleSaveData = () => {
    // Aquí generamos un array con los datos calculados.
    const dataToSave = filteredData.map(item => ({
      category: item.category,
      name: item.name,
      country: item.country,
      title: item.title,
      value: item.value, // Asegúrate de que este valor esté calculado previamente
      year: item.year,
      months: item.months,
    }));
  
    console.log('Datos a guardar:', dataToSave); // Verifica los datos que se enviarán
  
    // Enviar el array al backend
    axios.post('http://localhost:3005/save-data/', { data: dataToSave })
      .then(response => {
        console.log('Datos guardados:', response.data);
      })
      .catch(error => {
        console.error('Error al guardar los datos:', error);
      });
  };
  

  return (
    <FullscreenContainer>
      <FormControl fullWidth>
        <InputLabel id="year-select-label">Año</InputLabel>
        <Select
          labelId="year-select-label"
          value={year}
          onChange={handleFilterYear}
          label="Año"
          sx={{borderRadius: '30px', width: '100%'}}
        >
          <MenuItem value="">
            <em>Todos</em>
          </MenuItem>
          {uniqueYears.map(year => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Porcentaje Aplicado (%)"
        type="number"
        value={percentage}
        onChange={(e) => setPercentage(e.target.value)}
        fullWidth
        margin="normal"
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

      <Button variant="contained" color="primary" onClick={handleApplyPercentage} sx={{ width: '200px', borderRadius: '30px', backgroundColor: '#fff600', color: '#000' }}>
        Aplicar Porcentaje
      </Button>

      {/* Botón Save */}
      <Button variant="contained" color="secondary" onClick={handleSaveData} sx={{ width: '200px', borderRadius: '30px', backgroundColor: '#4caf50', color: '#fff', marginTop: '16px' }}>
        Guardar Datos
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Categoria</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Mes</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Valor Inicial</TableCell>
              {monthsOrder.map((month) => (
                <TableCell key={month} align="right">{month}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              // Aseguramos que "months" existe y es un arreglo válido
              item.months && Array.isArray(item.months) ? (
                <TableRow key={item._id}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  {item.months.map((monthValue, index) => (
                    <TableCell key={index} align="right">{monthValue}</TableCell>
                  ))}
                </TableRow>
              ) : (
                // Si no hay meses válidos, mostrar un mensaje
                <TableRow key={item._id}>
                  <TableCell colSpan={14} align="center">No data available</TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FullscreenContainer>
  );
};

export default PercentageTable;
