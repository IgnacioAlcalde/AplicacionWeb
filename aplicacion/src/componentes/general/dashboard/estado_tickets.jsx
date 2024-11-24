// DonutChartTickets.jsx
import React, { useEffect, useRef, useState } from 'react';
import { getAllTickets } from '../../../api/usuarios.api';
import Chart from 'chart.js/auto';

export function EstadoTickets() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Para almacenar la instancia del gráfico
  const [ticketEstados, setTicketEstados] = useState({});

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getAllTickets();
        const tickets = response.data;

        // Contar estados
        const estadoCounts = tickets.reduce((acc, ticket) => {
          acc[ticket.estado] = (acc[ticket.estado] || 0) + 1;
          return acc;
        }, {});

        setTicketEstados(estadoCounts);
      } catch (error) {
        console.error('Error al obtener tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    if (chartRef.current && Object.keys(ticketEstados).length > 0) {
      // Destruir la instancia existente, si existe
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      const dataFormatted = {
        labels: Object.keys(ticketEstados),
        datasets: [
          {
            data: Object.values(ticketEstados),
            backgroundColor: ['#99c2c7', '#7aacb2', '#4d868d', '#3b5c63', '#c3dcde'],
            hoverOffset: 4,
          },
        ],
      };

      // Crear una nueva instancia de gráfico
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

    // Limpiar el gráfico al desmontar el componente
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [ticketEstados]);

  return (
    <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
