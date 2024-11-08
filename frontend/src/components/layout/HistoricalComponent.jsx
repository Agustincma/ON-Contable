import { useEffect, useState } from 'react';
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
  InputLabel,
  FormControl,
  Button,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import EditIcon from '@mui/icons-material/Edit';

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

const modalStyle = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff600',
  border: 'none',
  borderRadius:'30px',
  boxShadow: 24,
  p: 4,
};

const HistoricalComponent = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [nameOptions, setNameOptions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idInput, setIdInput] = useState('');
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    country: '',
    currency: '',
    name: ''
  });

  // Fetch data on component mount
  const fetchHistoricalData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/generaltables/');
      setHistoricalData(response.data);
      setFilteredData(response.data);
      const uniqueNames = [...new Set(response.data.map((record) => record.name))];
      setNameOptions(uniqueNames);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, []);

  const handleFilterChange = (event) => {
    const selectedName = event.target.value;
    setSearchName(selectedName);
    const filtered = historicalData.filter((record) => record.name === selectedName);
    setFilteredData(filtered);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIdInput('');
    setFormData({
      category: '',
      title: '',
      country: '',
      currency: '',
      name: ''
    });
  };

  const handleIdChange = (event) => {
    setIdInput(event.target.value);
  };

  const handleSearch = async () => {
    if (idInput) {
      try {
        const response = await axios.get(`http://localhost:3005/generaltables/${idInput}`);
        if (response.data) {
          setFormData({
            category: response.data.category || '',
            title: response.data.title || '',
            country: response.data.country || '',
            currency: response.data.currency || '',
            name: response.data.name || ''
          });
        }
      } catch (error) {
        console.error('Error fetching data by ID:', error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3005/generaltables/${idInput}`, formData);
      handleCloseModal();
      await fetchHistoricalData(); // Recarga los datos después de enviar el formulario
    } catch (error) {
      console.error('Error updating record:', error);
    }
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
            color='black'
            sx={{borderRadius: '30px'}}
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
              <TableCell align="center">ID</TableCell>
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
                <TableCell align="center">{record._id}</TableCell>
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

      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: '100px', borderRadius: '30px', backgroundColor: '#fff600', color: '#000' }}
        >
          <CloudDownloadIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: '100px', borderRadius: '30px', backgroundColor: '#fff600', color: '#000' }}
          onClick={handleOpenModal}
        >
          <EditIcon />
        </Button>
      </Box>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#000', fontWeight: 'bold' }}>
            Edit Record
          </Typography>
          <TextField
            label="ID"
            value={idInput}
            onChange={handleIdChange}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              width: '100%',
              borderRadius: '30px',
              backgroundColor: '#fff',
              border: 'black',
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px',
              },
            }}
          />
          <Button onClick={handleSearch} variant="contained" color="primary" sx={{ width: '200px', borderRadius: '30px', backgroundColor: '#000', color: '#fff' }}>
            Search
          </Button>

          {/* Campos del formulario */}
          <TextField
            label="Categoría"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            fullWidth
            margin="normal"
            variant="outlined"
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
          <TextField
            label="Título"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            fullWidth
            margin="normal"
            variant="outlined"
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
          <TextField
            label="País"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            fullWidth
            margin="normal"
            variant="outlined"
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
          <TextField
            label="Moneda"
            value={formData.currency}
            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            fullWidth
            margin="normal"
            variant="outlined"
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
          <TextField
            label="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            margin="normal"
            variant="outlined"
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
          
          <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ width: '200px', borderRadius: '30px', backgroundColor: '#000', color: '#fff' }}>
            Save
          </Button>
        </Box>
      </Modal>
    </FullscreenContainer>
  );
};

export default HistoricalComponent;
