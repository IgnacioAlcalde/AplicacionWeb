// src/componentes/IncidenciasPorFecha.jsx
import React, { useEffect, useState } from 'react';
import { getAllIncidencias } from '../../../api/usuarios.api'; // Ajusta la ruta a tu API
import { Line } from 'react-chartjs-2'; // Usamos 'Line' para hacer un AreaChart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export  function IncidenciasPorFecha() {
  const [incidenciasPorFecha, setIncidenciasPorFecha] = useState([]);

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await getAllIncidencias(); // Obtén todas las incidencias
        const incidencias = response.data;

        // Contamos las incidencias por fecha
        const incidenciasCountByDate = incidencias.reduce((acc, incidencia) => {
          const fecha = new Date(incidencia.fecha).toLocaleDateString(); // Ajusta el formato de la fecha según sea necesario
          acc[fecha] = (acc[fecha] || 0) + 1;
          return acc;
        }, {});

        // Convertimos el objeto de fechas y conteos a arrays para el gráfico
        const fechas = Object.keys(incidenciasCountByDate);
        const counts = Object.values(incidenciasCountByDate);

        setIncidenciasPorFecha({
          fechas,
          counts,
        });
      } catch (error) {
        console.error('Error al obtener incidencias:', error);
      }
    };

    fetchIncidencias();
  }, []);

  // Configuración del gráfico de área
  const data = {
    labels: incidenciasPorFecha.fechas, // Las fechas en el eje X
    datasets: [
      {
        label: 'Incidencias por Fecha',
        data: incidenciasPorFecha.counts, // Cantidad de incidencias por fecha
        fill: true, // Hace el gráfico de área
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)', // Color del área debajo de la línea
        tension: 0.4, // Suaviza la línea
      },
    ],
  };

  // Configuración de opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Incidencias: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <div style={{ height: '400px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
