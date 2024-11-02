import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// Inicio de sesion
import IniciarSesionCorreo from "./paginas/inicio_sesion/iniciar_sesion_correo.jsx";
import IniciarSesionRut from "./paginas/inicio_sesion/iniciar_sesion_rut.jsx";
// Recuperacion de contraseña
import RecuperacionContraseña from "./paginas/inicio_sesion/recuperacion_contraseña.jsx";
// Componentes Director Municipalidad
import DirectorMunicipalidad from "./paginas/inicios/director_municipalidad.jsx";
import InicioMunicipalidad from "./componentes/director_municipalidad/inicio.jsx";
// Componentes Director de obra
import DirectorObra from "./paginas/inicios/director_obras.jsx";
import InicioObras from "./componentes/director_obra/inicio.jsx";
// Componentes Gestor Territorial
import GestorTerritorial from "./paginas/inicios/gestor_territorial.jsx";
import InicioGestor from "./componentes/gestor_territorial/inicio.jsx";
// Componentes Cuadrilla
import Cuadrilla from "./paginas/inicios/cuadrilla.jsx";
import InicioCuadrilla from "./componentes/cuadrilla/inicio.jsx";
import IncidenciasCuadrillas from "./componentes/cuadrilla/Incidencias.jsx";
import TareasCuadrillas from "./componentes/cuadrilla/tareas/tareas.jsx";
import DetallesTareasCuadrillas from "./componentes/cuadrilla/tareas/detalles.jsx";
//---------------------------------------------------------------------------------------------
function Aplicacion() {
  return (
    <div className="Aplicacion">
      <Router>
        <Routes>
          {/* Iniciar sesion */}
          <Route path="/" element={<IniciarSesionCorreo />} />
          <Route path="inicio_sesion_rut" element={<IniciarSesionRut />} />
          <Route
            path="recuperacion_contraseña"
            element={<RecuperacionContraseña />}
          />
          {/* Enrutamiento director municipalidad */}
          <Route
            path="director-municipalidad"
            element={<DirectorMunicipalidad />}
          >
            <Route path="inicio" element={<InicioMunicipalidad />} />
          </Route>
          {/* Enrutamiento director de obras */}
          <Route path="director-obra" element={<DirectorObra />}>
            <Route path="inicio" element={<InicioObras />} />
          </Route>
          {/* Enrutamiento gestor territorial */}
          <Route path="gestor-territorial" element={<GestorTerritorial />}>
            <Route path="inicio" element={<InicioGestor />} />
          </Route>
          {/* Enrutamiento cuadrillas */}
          <Route path='cuadrilla' element={<Cuadrilla/>}>
              <Route path="inicio" element={<InicioCuadrilla/>} />
              <Route path='incidencias' element={<IncidenciasCuadrillas/>}/>
              <Route path='tareas' element={<TareasCuadrillas/>}/>
              <Route path='detalles' element={<DetallesTareasCuadrillas/>}/>

            </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default Aplicacion;