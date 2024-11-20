import React, { useEffect, useState } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllIncidencias, deleteIncidencias} from '../../api/usuarios.api';
import { useNavigate } from 'react-router-dom';

export default function listado_incidencias() {
    const [proyectos, setProyectos] = useState([]);
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroInicio, setFiltroInicio] = useState('');
    const [mostrarFiltros, setMostrarFiltros] = useState(false); // Estado para mostrar/ocultar filtros
    const navegar = useNavigate();
    const editarIncidencia = (id) => {
        lert('Editar incidencia con ID: ' + id);
        navegar(`/editar-incidencia/${id}`);
    }
    // Cargar las incidencias desde el backend
    useEffect(() => {
        const fetchIncidencias = async () => {
            try {
                const response = await getAllIncidencias();
                setProyectos(response.data); // Asignar datos desde el backend
            } catch (error) {
                console.error('Error al obtener incidencias:', error);
            }
        };

        fetchIncidencias();
    }, []);

    // Filtrar incidencias
    const filtrarIncidencias = () => {
        return proyectos.filter((proyecto) => {
            const matchesNombre = proyecto.titulo.toLowerCase().includes(filtroNombre.toLowerCase());
            const matchesEstado = filtroEstado === '' || proyecto.estado === filtroEstado;
            const matchesInicio = filtroInicio === '' || proyecto.fecha === filtroInicio;

            return matchesNombre && matchesEstado && matchesInicio;
        });
    };

    return (
        <div className="card card-body text-black">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="tituloh2">Lista de Incidencias</h2>
                <button
                    className="btn btn-navegacion"
                    onClick={() => setMostrarFiltros(!mostrarFiltros)}
                >
                    {mostrarFiltros ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                </button>
            </div>
            <hr />
            {mostrarFiltros && (
                <div>
                    <h4 className="titulofiltro">Filtrar</h4>
                    <div className="filtro">
                        <input
                            type="text"
                            id="filtroNombre"
                            placeholder="Buscar por título"
                            value={filtroNombre}
                            onChange={(e) => setFiltroNombre(e.target.value)}
                        />
                        <select
                            id="filtroEstado"
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                        >
                            <option value="">Todos los estados</option>
                            <option value="Sin iniciar">Sin iniciar</option>
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
                    <hr />
                </div>
            )}
            <table id="incidencia" className="table table-hover">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Localización</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrarIncidencias().map((proyecto, index) => (
                        <tr key={index}>
                            <td>{proyecto.titulo}</td>
                            <td>{proyecto.estado}</td>
                            <td>{proyecto.fecha}</td>
                            <td>{proyecto.localizacion}</td>
                            <td>{proyecto.descripcion}</td>
                            <td>
                                <button
                                    className="btn btn-navegacion"
                                    onClick={() => editarIncidencia(proyecto.id)}
                                >Editar</button>
                                <button className="btn btn-navegacion ms-2" onClick={async () =>{
                                const accepted = window.confirm("Estas seguro que deseas eliminar la incidencia?"); 
                                if (accepted) { 
                                    await deleteIncidencias(proyecto.id); 
                                    alert("Incidencia eliminada exitosamente");
                                    window.location.reload();
                                }else{ alert("Operació́n cancelada"); 
                                        
                                    }}}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
