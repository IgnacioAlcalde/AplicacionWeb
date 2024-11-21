// npm install leaflet
import '../../componentes.css';

import React, { useEffect, useState } from 'react';
import L from 'leaflet'; // Biblioteca de Leaflet
import 'leaflet/dist/leaflet.css'; // Estilos de Leaflet
import axios from 'axios'; // Para solicitudes a la API
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {
  const [puntosDeInteres, setPuntosDeInteres] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        // Direcciones a geocodificar
        const direcciones = [
          'Av. Pedro de Valdivia 641, Santiago, Chile',
          'Av. Pedro de Valdivia 425, Santiago, Chile',
        ];

        // Promesas para geocodificar cada dirección
        const coordenadasPromises = direcciones.map(async (direccion) => {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              direccion
            )}`
          );

          // Retornar la primera coincidencia si existe
          if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return { lat: parseFloat(lat), lng: parseFloat(lon), nombre: direccion };
          }

          console.error(`No se encontró coordenada para: ${direccion}`);
          return null;
        });

        // Esperar que todas las promesas se resuelvan
        const resultados = await Promise.all(coordenadasPromises);
        setPuntosDeInteres(resultados.filter((punto) => punto !== null)); // Filtrar nulos
      } catch (error) {
        console.error('Error al geocodificar direcciones:', error);
      }
    };

    fetchCoordinates();
  }, []);

  useEffect(() => {
    if (puntosDeInteres.length > 0) {
      let map; // Variable para almacenar el mapa
  
      // Verificar si el mapa ya existe
      if (!map) {
        map = L.map('map').setView([-33.45694, -70.64827], 13);
  
        // Cargar los mosaicos de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);
      }
  
      // Agregar marcadores al mapa
      puntosDeInteres.forEach(({ lat, lng, nombre }) => {
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`<b>${nombre}</b>`);
      });
  
      // Limpiar el mapa al desmontar el componente
      return () => {
        if (map) {
          map.remove();
        }
      };
    }
  }, [puntosDeInteres]);
  

  return (
    <div className="card card-body text-black">
      <h1 className="display-6 text-center">Dashboard de Director Municipal</h1>
      <p className="text-center">Mapa con puntos de interés de las cuadrillas</p>
      <div className="Mapa flexv">
        <div id="map" style={{ height: '100%', width: '100%' }}></div>
      </div>
    </div>
  );
}
