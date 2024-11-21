import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, IconButton, Select, MenuItem, InputLabel, FormControl, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";

const FullscreenContainer = styled(Paper)({
  height: "70vh",
  width: "80vw",
  margin: "auto",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  borderRadius: "30px",
});

const BarChartComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterName, setFilterName] = useState(""); // Estado para el name seleccionado
  const [names, setNames] = useState([]); // Estado para almacenar los names únicos

  const formatData = (rawData) => {
    const formattedData = Array.from({ length: 12 }, (_, i) => ({ month: i }));

    rawData.forEach((record) => {
      record.months.forEach((value, monthIndex) => {
        const key = `${record.title}-${record.year}`;
        formattedData[monthIndex][key] = parseFloat(value);
      });
    });

    return formattedData;
  };

  const handleDelete = () => {
    axios
      .delete("http://localhost:3005/save-data/")
      .then(() => {
        setData([]); // Limpiar los datos en el estado
        setFilteredData([]); // Limpiar los datos filtrados
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleFilterChange = (event) => {
    const selectedName = event.target.value;
    setFilterName(selectedName);

    if (selectedName) {
      // Solicitar datos filtrados por name
      axios
        .get(`http://localhost:3005/save-data-name/${selectedName}`)
        .then((response) => {
          const formatted = formatData(response.data);
          setFilteredData(formatted);
        })
        .catch((error) => {
          console.error("Error fetching filtered data:", error);
        });
    } else {
      setFilteredData(data); // Si no hay filtro, mostrar todos los datos
    }
  };

  useEffect(() => {
    // Obtener todos los datos desde el endpoint
    axios
      .get("http://localhost:3005/save-data/")
      .then((response) => {
        const formatted = formatData(response.data);
        setData(formatted);
        setFilteredData(formatted); // Inicialmente no hay filtro, mostrar todos los datos

        // Extraer los names únicos para el filtro
        const uniqueNames = [...new Set(response.data.map((record) => record.name))];
        setNames(uniqueNames);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Colores apagados para las barras
  const colors = ["#561C24", "#2D4354", "#9E6752", "#20212B"];

  return (
    <FullscreenContainer>
      <h2>Comparison of Annually Projected Expenses</h2>
      <Box
        sx={{
          width: "100%",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl style={{ marginBottom: "16px", width: "300px" }}>
          <InputLabel>Filtrar por Name</InputLabel>
          <Select
            value={filterName}
            onChange={handleFilterChange}
            label="Filtrar por Name"
            sx={{ borderRadius: "30px", width: "100%" }}
          >
            {/* Opción para mostrar todos los datos */}
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>

            {/* Crear las opciones del dropdown a partir de los names únicos */}
            {names.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Icono para eliminar los datos */}
        <IconButton onClick={handleDelete} color="red" style={{ marginBottom: "16px" }}>
          <DeleteIcon color="error" />
        </IconButton>
      </Box>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickFormatter={(month) => {
              const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
              return months[month];
            }}
          />
          <YAxis />
          <Tooltip />
          <Legend />

          {filteredData.length > 0 &&
            Object.keys(filteredData[0])
              .filter((key) => key !== "month")
              .map((key, index) => (
                <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
              ))}
        </BarChart>
      </ResponsiveContainer>
    </FullscreenContainer>
  );
};

export default BarChartComponent;
