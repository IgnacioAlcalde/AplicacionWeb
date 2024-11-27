import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { getAllTipoFormularios } from "../../../api/usuarios.api";
import { obtencionFormularios } from "../../../api/api_formularios";

export const IncidenciasPorTipo = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Obtener los datos de tipos y de incidencias
        const [tiposResponse, incidenciasResponse] = await Promise.all([
          getAllTipoFormularios(),
          obtencionFormularios(),
        ]);

        const tipos = tiposResponse.data;
        const incidencias = incidenciasResponse;
        console.log("Tipos:", tipos);
        console.log("Incidencias:", incidencias);

        // Contar incidencias por tipo
        const tipoIncidenciaCounts = tipos.map((tipo) => ({
          nombre: tipo.nombre,
          count: incidencias.filter(
            (incidencia) => incidencia.tipoFormulario === tipo.nombre
          ).length,
        }));

        // Preparar datos para el gráfico
        const labels = tipoIncidenciaCounts.map((item) => item.nombre);
        const data = tipoIncidenciaCounts.map((item) => item.count);

        // Verificar que el canvas está disponible antes de crear el gráfico
        if (chartContainer.current) {
          const ctx = chartContainer.current.getContext("2d");

          if (chartInstance.current) {
            chartInstance.current.destroy(); // Destruir el gráfico anterior
          }

          chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
              labels,
              datasets: [
                {
                  label: "Cantidad de Incidencias",
                  data,
                  backgroundColor: [
                    "#99c2c7",
                    "#7aacb2",
                    "#4d868d",
                    "#3b5c63",
                    "#c3dcde",
                  ],
                },
              ],
            },
            options: {
              responsive: true,
              indexAxis: "y", // Hace las barras horizontales
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.raw} incidencias`,
                  },
                },
              },
              scales: {
                x: {
                  title: { display: true, text: "Cantidad de Incidencias" },
                },
                y: {
                  title: { display: true, text: "Tipos de Formularios" },
                },
              },
            },
          });
        }

        setLoading(false);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError("Error al cargar los datos.");
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Destruir el gráfico al desmontar el componente
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ width: "90%", height: "100%" }}>
      <canvas className="mx-4" ref={chartContainer}></canvas>
    </div>
  );
};
