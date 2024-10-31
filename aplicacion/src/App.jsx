import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IniciarSesionCorreo from './paginas/inicio_sesion/iniciar_sesion_correo.jsx';
import IniciarSesionRut from './paginas/inicio_sesion/iniciar_sesion_rut.jsx';
import DirectorMunicipalidad from './paginas/inicios/director_municipalidad.jsx';
import DirectorObra from './paginas/inicios/director_obras.jsx';
import GestorTerritorial from './paginas/inicios/gestor_territorial.jsx';
// Dashboard por rol
import InicioMunicipalidad from "./componentes/director_municipalidad/inicio.jsx";
import InicioObras from "./componentes/director_obra/inicio.jsx";
import InicioGestor from "./componentes/gestor_territorial/inicio.jsx";
function Aplicacion() {
    return (
      <div className='Aplicacion'>
        <Router>
          <Routes>
            <Route path="/" element={<IniciarSesionCorreo/>} />
            <Route path="inicio_sesion_rut" element={<IniciarSesionRut/>} />
            <Route path='director-municipalidad' element={<DirectorMunicipalidad/>}>
              <Route path="inicio" element={<InicioMunicipalidad />} />
            </Route>
            <Route path='director-obra' element={<DirectorObra/>}>
              <Route path="inicio" element={<InicioObras/>} />
            </Route>
            <Route path='gestor-territorial' element={<GestorTerritorial/>}>
              <Route path="inicio" element={<InicioGestor/>} />
            </Route>
          </Routes>
        </Router>
      </div>
    )
  }
  export default Aplicacion
  