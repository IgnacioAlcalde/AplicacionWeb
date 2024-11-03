import React, { useEffect, useState } from 'react';
import '../../inicio.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllUsuarios } from '../../api/usuarios.api';

export default function lista_usuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function loadUsuarios() {
            try {
                const res = await getAllUsuarios();
                setUsuarios(res.data);
                console.log(res.data);
            } catch (error) {
                console.error('Error al cargar los usuarios:', error);
            }
        }
        loadUsuarios();
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

    return (
        <div className='card card-body text-black'>
            <h3>Lista de Empleados</h3>
            <table className="table table-bordered">
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
                    {usuarios.map((usuario) => (
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
