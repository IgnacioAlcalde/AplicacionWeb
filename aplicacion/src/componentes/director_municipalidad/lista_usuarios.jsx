import React from 'react'
import '../../inicio.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function lista_usuarios() {
  return (
    <div className='card card-body text-black '>
            <h3>Lista de Empleados</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo Electrónico</th>
                        <th>Rol</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Juan</td>
                        <td>Pérez</td>
                        <td>juan.perez@ejemplo.com</td>
                        <td>Administrador</td>
                        <td>Activo</td>
                    </tr>
                    <tr>
                        <td>María</td>
                        <td>López</td>
                        <td>maria.lopez@ejemplo.com</td>
                        <td>Soporte</td>
                        <td>Inactivo</td>
                    </tr>
                    <tr>
                        <td>Carlos</td>
                        <td>González</td>
                        <td>carlos.gonzalez@ejemplo.com</td>
                        <td>Usuario</td>
                        <td>Activo</td>
                    </tr>
                </tbody>
            </table>
        </div>
  )
}
