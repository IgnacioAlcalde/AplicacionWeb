import React, { useState, useEffect } from 'react';

export default function ListaDocumentos() {
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../../api/api_formularios.js'); 
        const data = await response.json();

        if (Array.isArray(data)) {
          setDocumentos(data);
        } else {
          console.error('Formato de datos recibido no es válido');
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Documentos del Director</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Tipo</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {documentos.map((documento) => (
            <tr key={documento.id}>
              <td>{documento.titulo}</td>
              <td>{documento.tipo}</td>
              <td>{documento.fechaCreacion}</td>
              <td>
                <button onClick={() => {}}>Ver</button>
                <button onClick={() => {}}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}