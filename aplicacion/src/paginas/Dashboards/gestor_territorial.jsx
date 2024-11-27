import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import '../../App.css';
import logo_autonoma from "../logo_uautonoma.png";

export default function Gestorterritorial() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate('/');

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
                className='text-black rounded w-100 d-inline-block px-4'
              >
                <span className="icon">🏠</span> Inicio
              </Link>
            </li>
            <hr/>
            <li>
              <Link
                to="crear-formularios"
                className='text-black rounded w-100 d-inline-block px-4'
              >
                <span className="icon">✏️</span> Registrar Formularios
              </Link>
            </li>
            <hr/>
              <li>
                <Link
                  to="generar-ticket"
                  className='text-black rounded w-100 d-inline-block px-4'
                  >
                  <span className="icon">🔧</span>Tickets de soporte
                </Link>
              </li>
          </ul>
        </div>
        <div className="Contenido mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
