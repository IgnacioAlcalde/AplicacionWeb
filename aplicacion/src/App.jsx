import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IniciarSesion from './paginas/inicio_sesion/iniciar_sesion.jsx'
import DirectorMunicipalidad from './paginas/inicios/director_municipalidad.jsx';
import Inicio from "./componentes/director_municipalidad/inicio.jsx";
function Aplicacion() {
    return (
      <div className='Aplicacion'>
        <Router>
          <Routes>
            <Route path="/" element={<IniciarSesion/>} />
            <Route path='director-municipalidad' element={<DirectorMunicipalidad/>}>
              <Route path="inicio" element={<Inicio />} />
            </Route>
          </Routes>
        </Router>
      </div>
    )
  }
  export default Aplicacion
  