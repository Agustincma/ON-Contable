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
import { Paper } from "@mui/material";
import styled from "@emotion/styled";

// Definimos estilos personalizados para el contenedor
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

  // Función para formatear los datos para Recharts
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

  useEffect(() => {
    // Obtener datos desde el endpoint
    axios.get("http://localhost:3005/save-data/")
      .then((response) => {
        const formatted = formatData(response.data);
        setData(formatted);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Colores apagados para las barras
  const colors = ["#561C24", "#2D4354", "#9E6752", "#20212B"];

  return (
    <FullscreenContainer>
      <h2>Comparativa de Costos por Mes y Título (Años)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(month) => {
            const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
            return months[month];
          }} />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Generamos una barra para cada título y año */}
          {data.length > 0 && Object.keys(data[0]).filter(key => key !== "month").map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]} // Usar colores apagados cíclicamente
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </FullscreenContainer>
  );
};

export default BarChartComponent;
