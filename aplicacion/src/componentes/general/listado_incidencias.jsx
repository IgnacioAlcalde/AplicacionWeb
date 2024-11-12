import React, { useEffect, useState } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function listado_incidencias() {
    const [proyectos, setProyectos] = useState([
        { nombre: 'Incidencia A', estado: 'En progreso', inicio: '2023-11-01' },
        { nombre: 'Incidencia B', estado: 'Completado', inicio: '2023-10-20', fin: '2023-11-10' },
        { nombre: 'Incidencia C', estado: 'Completado', inicio: '2023-09-10', fin: '2023-10-10' },
        { nombre: 'Incidencia D', estado: 'No Terminado', inicio: '2023-12-06' },
    ]);

    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroInicio, setFiltroInicio] = useState('');

    // Función para manejar la edición
    const editarIncidencia = (index) => {
        alert('Editar incidencia: ' + proyectos[index].nombre);
        // Aquí podrías redirigir a una página de edición o abrir un formulario modal
    };

    // Filtrar incidencias
    const filtrarIncidencias = () => {
        return proyectos.filter(proyecto => {
            const matchesNombre = proyecto.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
            const matchesEstado = filtroEstado === '' || proyecto.estado === filtroEstado;
            const matchesInicio = filtroInicio === '' || proyecto.inicio === filtroInicio;

            return matchesNombre && matchesEstado && matchesInicio;
        });
    };

    useEffect(() => {
        // Este efecto podría utilizarse para cargar datos iniciales si es necesario
    }, []);

    return (
        <div className='card card-body text-black'>
            <h2 className="tituloh2">Lista de Proyectos Activos</h2>
            <h4 className="titulofiltro">Filtrar</h4>

            <div className="filtro">
                <input
                    type="text"
                    id="filtroNombre"
                    placeholder="Buscar por nombre"
                    value={filtroNombre}
                    onChange={(e) => setFiltroNombre(e.target.value)}
                />
                <select
                    id="filtroEstado"
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                >
                    <option value="">Todos los estados</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completado">Completado</option>
                    <option value="No Terminado">No terminado</option>
                </select>
                <input
                    type="date"
                    id="filtroInicio"
                    value={filtroInicio}
                    onChange={(e) => setFiltroInicio(e.target.value)}
                />
            </div>

            <table id="incidencia" className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Término</th>
                        <th>Editar incidencia</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrarIncidencias().map((proyecto, index) => (
                        <tr key={index}>
                            <td>{proyecto.nombre}</td>
                            <td>{proyecto.estado}</td>
                            <td>{proyecto.inicio}</td>
                            <td>{proyecto.fin || 'N/A'}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => editarIncidencia(index)}
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
