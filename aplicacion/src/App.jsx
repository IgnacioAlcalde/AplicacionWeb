import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IniciarSesionCorreo from './paginas/inicio_sesion/iniciar_sesion_correo.jsx';
import IniciarSesionRut from './paginas/inicio_sesion/iniciar_sesion_rut.jsx';
import DirectorMunicipalidad from './paginas/inicios/director_municipalidad.jsx';
import Inicio from "./componentes/director_municipalidad/inicio.jsx";
function Aplicacion() {
    return (
      <div className='Aplicacion'>
        <Router>
          <Routes>
            <Route path="/" element={<IniciarSesionCorreo/>} />
            <Route path="inicio_sesion_rut" element={<IniciarSesionRut/>} />
            <Route path='director-municipalidad' element={<DirectorMunicipalidad/>}>
              <Route path="inicio" element={<Inicio />} />
            </Route>
          </Routes>
        </Router>
      </div>
    )
  }
  export default Aplicacion
  