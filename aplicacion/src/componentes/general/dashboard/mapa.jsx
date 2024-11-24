import '../../../componentes.css';
import {getAllIncidencias} from '../../../api/usuarios.api';
import React, { useEffect, useState } from 'react';
import L from 'leaflet'; // Biblioteca de Leaflet
import 'leaflet/dist/leaflet.css'; // Estilos de Leaflet
import axios from 'axios'; // Para solicitudes a la API
import '../../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Mapa() {
  const [puntosDeInteres, setPuntosDeInteres] = useState([]);

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        // Llama a tu backend para obtener las incidencias
        const response = await getAllIncidencias(); // Ajusta la URL según tu API
        const incidencias = response.data;

        // Promesas para geocodificar cada incidencia
        const coordenadasPromises = incidencias.map(async (incidencia) => {
          const { localizacion, titulo } = incidencia; // Asegúrate de que estos campos existan en tu modelo
          try {
            const geoResponse = await axios.get(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                localizacion
              )}`
            );

            // Retornar la primera coincidencia si existe
            if (geoResponse.data && geoResponse.data.length > 0) {
              const { lat, lon } = geoResponse.data[0];
              return { lat: parseFloat(lat), lng: parseFloat(lon), titulo };
            } else {
              console.error(`No se encontró coordenada para: ${localizacion}`);
              return null;
            }
          } catch (geoError) {
            console.error(`Error al geocodificar: ${localizacion}`, geoError);
            return null;
          }
        });

        // Esperar que todas las promesas se resuelvan
        const resultados = await Promise.all(coordenadasPromises);
        setPuntosDeInteres(resultados.filter((punto) => punto !== null)); // Filtrar nulos
      } catch (error) {
        console.error('Error al obtener incidencias:', error);
      }
    };

    fetchIncidencias();
  }, []);

  useEffect(() => {
    if (puntosDeInteres.length > 0) {
      // Crear o actualizar el mapa
      const map = L.map('map').setView([-33.43107, -70.60454], 13);

      // Cargar los mosaicos de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Agregar marcadores al mapa
      puntosDeInteres.forEach(({ lat, lng, titulo }) => {
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`<b>${titulo}</b>`);
      });

      // Limpiar el mapa al desmontar el componente
      return () => {
        map.remove();
      };
    }
  }, [puntosDeInteres]);

  return (
      <div>
        <div id="map" style={{ height: '460px', width: '100%' }}></div>
      </div>
  );
}
