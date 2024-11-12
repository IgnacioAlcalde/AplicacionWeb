import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import '../../App.css';
import logo_autonoma from "../logo_uautonoma.png";

export default function CuadrilasDashboard() {
    const navigate = useNavigate();
    const handleNavigate = () => navigate('/');
  
    return (
  <div className="Inicio">
        <div className="navbar">
          <img src={logo_autonoma} alt="logo" className='logo_autonoma' />
          <h1 className=''>UrbanSenso</h1>
          <button onClick={handleNavigate} className="Logout">Cerrar Sesión</button>
        </div>    
        <div className="lateral">
          <div className="Barralateral">
            <ul>
              <li>
                <Link
                  to="inicio"
                  className='text-black rounded w-100 d-inline-block px-4'
                  >
                  <span className="icon">🏠</span> Inicio
                </Link>
              </li>
              <hr/>
              <li>
                <Link
                  to="incidencias"
                  className='text-black rounded w-100 d-inline-block px-4'
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
  