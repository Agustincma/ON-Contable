import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Paper,
  Box,
  Typography,
  InputLabel,
  FormControl
} from '@mui/material';
import { styled } from '@mui/system';

// Estilos para el contenedor principal
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

// Componente principal
const HistoricalComponent = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [nameOptions, setNameOptions] = useState([]);

  // Fetch historical records on component mount
  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/generaltables/');
        setHistoricalData(response.data);
        setFilteredData(response.data); // Set initial data to be shown

        // Extract unique name values for the dropdown filter
        const uniqueNames = [...new Set(response.data.map((record) => record.name))];
        setNameOptions(uniqueNames);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };
    fetchHistoricalData();
  }, []);

  // Handle filter change
  const handleFilterChange = (event) => {
    const selectedName = event.target.value;
    setSearchName(selectedName);

    // Filter the historical data by name
    const filtered = historicalData.filter((record) =>
      record.name === selectedName
    );
    setFilteredData(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <FullscreenContainer>
      <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%">
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Filtrar por nombre</InputLabel>
          <Select
            value={searchName}
            onChange={handleFilterChange}
            label="Filtrar por nombre"
            displayEmpty
          >
            <MenuItem value="">
              <em>Seleccionar un nombre</em>
            </MenuItem>
            {nameOptions.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: '400px', overflow: 'auto' }}>
        <Table aria-label="Historical Data">
          <TableHead>
            <TableRow>
              <TableCell align="center">Categoría</TableCell>
              <TableCell align="center">Título</TableCell>
              <TableCell align="center">País</TableCell>
              <TableCell align="center">Moneda</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Fecha de Creación</TableCell>
              <TableCell align="center">Fecha de Actualización</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((record) => (
              <TableRow key={record._id}>
                <TableCell align="center">{record.category}</TableCell>
                <TableCell align="center">{record.title}</TableCell>
                <TableCell align="center">{record.country}</TableCell>
                <TableCell align="center">{record.currency}</TableCell>
                <TableCell align="center">{record.name}</TableCell>
                <TableCell align="center">{formatDate(record.createdAt)}</TableCell>
                <TableCell align="center">{formatDate(record.updatedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FullscreenContainer>
  );
};

export default HistoricalComponent;
