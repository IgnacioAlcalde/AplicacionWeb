import React, { useEffect, useState } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllUsuarios, getAllRoles } from '../../api/usuarios.api';

export default function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [filtroRol, setFiltroRol] = useState('');
    const [filtroRun, setFiltroRun] = useState('');
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroCorreo, setFiltroCorreo] = useState('');
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [mostrarFiltro, setMostrarFiltro] = useState(false);

    useEffect(() => {
        async function loadUsuarios() {
            try {
                const res = await getAllUsuarios();
                setUsuarios(res.data);
                setUsuariosFiltrados(res.data);
            } catch (error) {
                console.error('Error al cargar los usuarios:', error);
            }
        }

        async function loadRoles() {
            try {
                const res = await getAllRoles();
                setRoles(res.data);
            } catch (error) {
                console.error('Error al cargar los roles:', error);
            }
        }

        loadUsuarios();
        loadRoles();
    }, []);

    function calcularEdad(fechaNacimiento) {
        const fechaNacimientoDate = new Date(fechaNacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
        const mesDif = hoy.getMonth() - fechaNacimientoDate.getMonth();

        if (mesDif < 0 || (mesDif === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
            edad--;
        }

        return edad;
    }

    // Función para aplicar filtros a los usuarios
    const aplicarFiltros = () => {
        let usuariosFiltrados = usuarios;

        if (filtroRol) {
            usuariosFiltrados = usuariosFiltrados.filter(usuario => usuario.rol === filtroRol);
        }
        if (filtroRun) {
            usuariosFiltrados = usuariosFiltrados.filter(usuario => usuario.run.includes(filtroRun));
        }
        if (filtroNombre) {
            usuariosFiltrados = usuariosFiltrados.filter(usuario => usuario.nombre.toLowerCase().includes(filtroNombre.toLowerCase()));
        }
        if (filtroCorreo) {
            usuariosFiltrados = usuariosFiltrados.filter(usuario => usuario.correo.toLowerCase().includes(filtroCorreo.toLowerCase()));
        }

        setUsuariosFiltrados(usuariosFiltrados);
    };

    return (
        <div className='card card-body text-black'>
            <div className="d-flex justify-content-between align-items-center">
                <h3>Lista de Empleados</h3>
                <button className="btn btn-navegacion" onClick={() => setMostrarFiltro(!mostrarFiltro)}>
                    Filtrar
                </button>
            </div>
            <hr/>

            {/* Sección de Filtro */}
            {mostrarFiltro && (
                <div className="mb-3">
                    <div className="form-group">
                        <label htmlFor="rol">Filtrar por Rol:</label>
                        <select
                            className="form-control"
                            id="rol"
                            value={filtroRol}
                            onChange={(e) => setFiltroRol(e.target.value)}
                        >
                            <option value="">Todos</option>
                            {roles.map((rol) => (
                                <option key={rol.id} value={rol.nombre}>{rol.nombre}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="run">Filtrar por RUN:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="run"
                            value={filtroRun}
                            onChange={(e) => setFiltroRun(e.target.value)}
                            placeholder="Ingrese el RUN"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre">Filtrar por Nombre:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            value={filtroNombre}
                            onChange={(e) => setFiltroNombre(e.target.value)}
                            placeholder="Ingrese el Nombre"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="correo">Filtrar por Correo:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="correo"
                            value={filtroCorreo}
                            onChange={(e) => setFiltroCorreo(e.target.value)}
                            placeholder="Ingrese el Correo"
                        />
                    </div>
                    
                    <button className="btn btn-navegacion" onClick={aplicarFiltros}>Aplicar Filtros</button>
                </div>
            )}

            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>RUN</th>
                        <th>Edad</th>
                        <th>Correo Electrónico</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosFiltrados.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.run}</td>
                            <td>{calcularEdad(usuario.fecha_nacimiento)} años</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.rol}</td>
                            <td><button className="btn btn-primary">Editar</button><button className="btn btn-danger">Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
