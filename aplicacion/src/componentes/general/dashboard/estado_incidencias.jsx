import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto'; // Importar Chart.js
import { getAllIncidencias } from '../../../api/usuarios.api'; // Asegúrate de ajustar la ruta según tu proyecto

export function EstadoIncidencias() {
  const [incidencias, setIncidencias] = useState([]);
  const chartRef = useRef(null); // Referencia al canvas del gráfico
  const chartInstance = useRef(null); // Referencia al gráfico de Chart.js

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await getAllIncidencias(); // Llamada al backend
        setIncidencias(response.data); // Guardar las incidencias en el estado
      } catch (error) {
        console.error('Error al obtener incidencias:', error);
      }
    };

    fetchIncidencias();
  }, []);

  useEffect(() => {
    if (chartRef.current && incidencias.length > 0) {
      // Procesar datos de estados
      const estadosCount = incidencias.reduce((acc, { estado }) => {
        acc[estado] = (acc[estado] || 0) + 1;
        return acc;
      }, {});

      const dataFormatted = {
        labels: Object.keys(estadosCount), // Estados únicos
        datasets: [
          {
            data: Object.values(estadosCount), // Cantidad por estado
            backgroundColor: ['#99c2c7', '#7aacb2', '#4d868d', '#3b5c63', '#c3dcde'],
          },
        ],
      };

      // Destruir el gráfico anterior si existe
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Crear el gráfico
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: dataFormatted,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }
  }, [incidencias]);

  return (
    <div style={{ width: '400px',height: '100%'}}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
