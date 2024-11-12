import React, { useEffect, useState } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllUsuarios, getAllRoles } from '../../api/usuarios.api';

export default function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]); // Estado para almacenar los roles disponibles
    const [filtroRol, setFiltroRol] = useState(''); // Estado para el rol seleccionado
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]); // Estado para los usuarios filtrados
    const [mostrarFiltro, setMostrarFiltro] = useState(false); // Estado para mostrar/ocultar el filtro

    useEffect(() => {
        async function loadUsuarios() {
            try {
                const res = await getAllUsuarios();
                setUsuarios(res.data);
                setUsuariosFiltrados(res.data); // Inicialmente, muestra todos los usuarios
            } catch (error) {
                console.error('Error al cargar los usuarios:', error);
            }
        }

        async function loadRoles() {
            try {
                const res = await getAllRoles();
                setRoles(res.data); // Cargar los roles desde la API
            } catch (error) {
                console.error('Error al cargar los roles:', error);
            }
        }

        loadUsuarios();
        loadRoles();
    }, []);

    // Función para calcular la edad a partir de la fecha de nacimiento
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

    // Función para manejar el cambio en el filtro de rol
    const handleFiltroRolChange = (event) => {
        const selectedRol = event.target.value;
        setFiltroRol(selectedRol);

        // Filtrar usuarios en base al rol seleccionado
        if (selectedRol) {
            const usuariosFiltrados = usuarios.filter(usuario => usuario.rol === selectedRol);
            setUsuariosFiltrados(usuariosFiltrados);
        } else {
            // Si no se selecciona ningún rol, mostrar todos los usuarios
            setUsuariosFiltrados(usuarios);
        }
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
                <div className="form-group">
                    <label htmlFor="rol">Filtrar por Rol:</label>
                    <select
                        className="form-control"
                        id="rol"
                        value={filtroRol}
                        onChange={handleFiltroRolChange}
                    >
                        <option value="">Todos</option>
                        {roles.map((rol) => (
                            <option key={rol.id} value={rol.nombre}>{rol.nombre}</option>
                        ))}
                    </select>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
