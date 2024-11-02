import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import '../../inicio.css';
import logo_autonoma from "../logo_uautonoma.png";

export default function CuadrilasDashboard() {
    const navigate = useNavigate();
    const handleNavigate = () => navigate('/');
  
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
  
    return (
  <div className="Inicio">
        <div className="navbar">
          <img src={logo_autonoma} alt="logo" className='logo_autonoma' />
          <h1 className=''>UrbanSenso</h1>
          <button onClick={handleNavigate} className="Logout text-black rounded py-1 w-10 d-inline-block px-4">Cerrar Sesión</button>
        </div>    
        <div className="lateral">
          <div className="Barralateral">
            <ul>
              <li>
                <Link
                  to="inicio"
                  className={`text-black rounded py-2 w-100 d-inline-block px-4 ${isActive('/cuadrilla/inicio') ? 'active' : ''}`}
                >
                  <span className="icon">🏠</span> Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="incidencias"
                  className={`text-black rounded py-2 w-100 d-inline-block px-4 ${isActive('/cuadrilla/incidencias') ? 'active' : ''}`}
                >
                  <span className="icon">📋</span>Listado de Incidencias asignadas
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
  