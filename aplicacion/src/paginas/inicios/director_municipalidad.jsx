import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import '../../inicio.css';
import logo_autonoma from "../logo_uautonoma.png";

export default function Directormunicipalidad() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate('/');

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
<div className="Inicio">
      <div className="navbar">
        <img src={logo_autonoma} alt="logo" className='logo_autonoma' />
        <h1>UrbanSenso</h1>
        <button onClick={handleNavigate} className="Logout">Cerrar Sesión</button>
      </div>    
      <div className="lateral">
        <div className="Barralateral">
          <ul>
            <li>
              <Link
                to="inicio"
                className={`text-black rounded py-2 w-100 d-inline-block px-4 ${isActive('/director-municipalidad/inicio') ? 'active' : ''}`}
              >
                <span className="icon">🏠</span>Inicio
              </Link>
            </li>
            <li>
              <Link
                to="listado-incidencias"
                className={`text-black rounded py-2 w-100 d-inline-block px-4 ${isActive('/director-municipalidad/listado-incidencias') ? 'active' : ''}`}
              >
                <span className="icon">📋</span>Listado de Incidencias
              </Link>
            </li>
            <li>
              <Link
                to="editar-incidencias"
                className={`text-black rounded py-2 w-100 d-inline-block px-4 ${isActive('/director-municipalidad/editar-incidencias') ? 'active' : ''}`}
              >
                <span className="icon">✏️</span>Editar Incidencia
              </Link>
            </li>
            <li>
              <Link
                to="crear-usuarios"
                className={`text-black rounded py-2 w-100 d-inline-block px-4 ${isActive('/director-municipalidad/crear-usuarios') ? 'active' : ''}`}
              >
                <span className="icon">👤</span>Crear usuarios
              </Link>
            </li>
            <li>
              <Link
                to="lista-usuarios"
                className={`text-black rounded py-2 w-100 d-inline-block px-4 ${isActive('/director-municipalidad/lista-usuarios') ? 'active' : ''}`}
              >
                <span className="icon">📋👤</span>Listado de usuarios
              </Link>
            </li>
            <li>
              <Link
                to="buscar-usuarios"
                className={`text-black rounded py-2 w-100 d-inline-block px-4 ${isActive('/director-municipalidad/buscar-usuarios') ? 'active' : ''}`}
              >
                <span className="icon">📋👤</span>Buscar usuarios
              </Link>
            </li>
          </ul>
        </div>
        <div className="Contenido">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
