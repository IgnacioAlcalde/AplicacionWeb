import React, { useState } from 'react';
import '../../inicio.css';
import '../../componentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function buscar_usuarios() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('');
    const [estado, setEstado] = useState('');
    const [resultados, setResultados] = useState('');

    // Filtros predefinidos
    const applyFilter = (filter) => {
        setResultados(`Filtro aplicado: ${filter}`);
    };

    // Búsqueda en tiempo real
    const realTimeSearch = () => {
        setResultados(`
            <p>Resultados para:</p>
            <ul>
                <li><strong>Nombre:</strong> ${nombre || 'No especificado'}</li>
                <li><strong>Email:</strong> ${email || 'No especificado'}</li>
                <li><strong>Rol:</strong> ${rol || 'No especificado'}</li>
                <li><strong>Estado:</strong> ${estado || 'No especificado'}</li>
            </ul>
            <div class="row botones-container">
                <div class="col-auto">
                    <button class="btn btn-primary">Ver</button>
                </div>
                <div class="col-auto">
                    <button class="btn btn-secondary">Editar</button>
                </div>
                <div class="col-auto">
                    <button class="btn btn-warning">Cambiar Contraseña</button>
                </div>
                <div class="col-auto">
                    <button class="btn btn-danger">Bloquear</button>
                </div>
            </div>
        `);
    };

    return (
        <div className="card card-body text-black">
            <h1 className="text-center mb-4">Búsqueda Avanzada de Usuarios</h1>

            {/* Filtros Predefinidos */}
            <div className="mb-4">
            <h5>Filtros Predefinidos:</h5>
            <button className="btn btn-navegacion mx-2" onClick={() => applyFilter('activos')}>
                Usuarios Activos
            </button>
            <button className="btn btn-navegacion mx-2" onClick={() => applyFilter('inactivos')}>
                Usuarios Inactivos
            </button>
            </div>

            {/* Formulario de Búsqueda */}
            <form id="searchForm" onSubmit={(e) => { e.preventDefault(); realTimeSearch(); }}>
                <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre del Usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            placeholder="Ingresa el nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Ingresa el email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="rol" className="form-label">Rol</label>
                        <select
                            className="form-select"
                            id="rol"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                        >
                            <option value="">Selecciona un rol</option>
                            <option value="admin">Administrador</option>
                            <option value="depa">Departamento</option>
                            <option value="terri">Gestor Territorial</option>
                            <option value="res">Resolutor</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="estado" className="form-label">Estado</label>
                        <select
                            className="form-select"
                            id="estado"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        >
                            <option value="">Selecciona un estado</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>
                </div>
                {/* Botón de Buscar */}
                <button type="button" className="btn btn-custom" onClick={realTimeSearch}>Buscar</button>
            </form>

            {/* Resultados de Búsqueda */}
            <div className="mt-5">
                <h5>Resultados de Búsqueda:</h5>
                <div id="resultados" className="border p-3 bg-light" dangerouslySetInnerHTML={{ __html: resultados }} />
            </div>
        </div>
    );
}
