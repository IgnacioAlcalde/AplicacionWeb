import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IniciarSesion from './paginas/inicio_sesion/iniciar_sesion.jsx'
import DirectorMunicipalidad from './paginas/inicios/director_municipalidad.jsx';
import InicioMunicipalidad from "./componentes/director_municipalidad/inicio.jsx";
//Cuadrillas
import Cuadrilla from "./paginas/inicios/cuadrilla.jsx";
import InicioCuadrilla from "./componentes/cuadrilla/inicio.jsx";
import IncidenciasCuadrillas from "./componentes/cuadrilla/Incidencias.jsx";
import TareasCuadrillas from "./componentes/cuadrilla/tareas/tareas.jsx";
import DetallesTareasCuadrillas from "./componentes/cuadrilla/tareas/detalles.jsx";


function Aplicacion() {
    return (
      <div className='Aplicacion'>
        <Router>
          <Routes>
            <Route path="/" element={<IniciarSesion/>} />
            <Route path='director-municipalidad' element={<DirectorMunicipalidad/>}>
              <Route path="inicio" element={<InicioMunicipalidad />} />
            </Route>

            <Route path='cuadrilla' element={<Cuadrilla/>}>
              <Route path="inicio" element={<InicioCuadrilla/>} />

              <Route path='incidencias' element={<IncidenciasCuadrillas/>}/>
              <Route path='tareas' element={<TareasCuadrillas/>}/>
              <Route path='detalles' element={<DetallesTareasCuadrillas/>}/>

            </Route>

          </Routes>
        </Router>
      </div>
    )
  }
  export default Aplicacion
  