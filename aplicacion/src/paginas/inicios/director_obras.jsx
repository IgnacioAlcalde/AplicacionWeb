import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import '../../inicio.css';
import logo_autonoma from "../logo_uautonoma.png";

export default function Directorobra() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate('/');

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="Inicio">
      <div className="navbar">
        <img src={logo_autonoma} alt="logo" className="logo_autonoma" />
        <h1>UrbanSenso</h1>
        <button onClick={handleNavigate} className="Logout">Cerrar Sesión</button>
      </div>
      
      <div className="lateral">
        <div className="Barralateral">
          <ul>
            <li>
              <Link
                to="inicio"
                className={`text-black rounded py-2 w-100 d-inline-block px-4 ${isActive('/director-obra/inicio') ? 'active' : ''}`}
              >
                <span className="icon">🏠</span> Inicio
              </Link>
            </li>
            <li>
              <Link
                to="listado_incidencias"
                className={`text-black rounded py-2 w-100 d-inline-block px-4 ${isActive('/director-obra/listado_incidencias') ? 'active' : ''}`}
              >
                <span className="icon">📋</span> Listado de Incidencias
              </Link>
            </li>
            <li>
              <Link
                to="formulario_para_editar"
                className={`text-black rounded py-2 w-100 d-inline-block px-4 ${isActive('/director-obra/formulario_para_editar') ? 'active' : ''}`}
              >
                <span className="icon">✏️</span> Editar Incidencia
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
