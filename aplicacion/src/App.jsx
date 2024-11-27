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
import CrearUsuarios from "./componentes/director_municipalidad/crear_usuarios.jsx";
import CrearRol from "./componentes/director_municipalidad/crear_rol.jsx";
import EditarUsuario from "./componentes/director_municipalidad/editar_usuario.jsx";
import ListaUsuariosMunicipalidad from './componentes/director_municipalidad/lista_usuarios.jsx';
import CargaMasiva from './componentes/director_municipalidad/carga_masiva.jsx';
// Componentes Director de obra
import DirectorObra from "./paginas/inicios/director_obras.jsx";
import InicioObras from "./componentes/director_obra/inicio.jsx";
import CrearCuadrillas from "./componentes/director_obra/crear_cuadrillas.jsx";
import AsignarCuadrilla from "./componentes/director_obra/asignar_cuadrilla.jsx";
import Documentacion from "./componentes/director_obra/documentacion.jsx";
// Componentes Gestor Territorial
import GestorTerritorial from "./paginas/inicios/gestor_territorial.jsx";
import InicioGestor from "./componentes/gestor_territorial/inicio.jsx";
import CrearFormularios from "./componentes/gestor_territorial/formulario.jsx";
// Componentes Cuadrilla
import Cuadrilla from "./paginas/inicios/cuadrilla.jsx";
import InicioCuadrilla from "./componentes/cuadrilla/inicio.jsx";
import IncidenciasCuadrillas from "./componentes/cuadrilla/Incidencias.jsx";
import TareasCuadrillas from "./componentes/cuadrilla/tareas/tareas.jsx";
import DetallesTareasCuadrillas from "./componentes/cuadrilla/tareas/detalles.jsx";
//General
import ListaIncidencias from "./componentes/general/listado_incidencias.jsx";
import EditarIncidencias from "./componentes/general/editar_incidencias.jsx"
import TareasIncidencias from "./componentes/general/tareas_incidencias.jsx"
//---------------------------------------------------------------------------------------------
function Aplicacion() {
  return (
    <div className="Aplicacion">
      <Router>
        <Routes>
          {/* Iniciar sesion */}
          <Route path="/" element={<IniciarSesionCorreo />} />
          <Route path="inicio-sesion-rut" element={<IniciarSesionRut />} />
          <Route
            path="recuperacion_contraseña"
            element={<RecuperacionContraseña />}
          />
          {/* Enrutamiento director municipalidad */}
          <Route path="director-municipalidad" element={<DirectorMunicipalidad />}>
            <Route path="inicio" element={<InicioMunicipalidad />} />
            <Route path="crear-usuarios" element={<CrearUsuarios />} />
            <Route path="crear-rol" element={<CrearRol />} />
            <Route path='lista-usuarios' element={<ListaUsuariosMunicipalidad/>}/>
            <Route path='editar-usuario/:id' element={<EditarUsuario/>}/>
            <Route path='carga-masiva' element={<CargaMasiva/>}/>
            <Route path="listado-incidencias" element={<ListaIncidencias />} />
            <Route path="editar-incidencias/:id" element={<EditarIncidencias/>} />
            <Route path="tareas-incidencias/:id" element={<TareasIncidencias/>} />
          </Route>
          {/* Enrutamiento director de obras */}
          <Route path="director-obra" element={<DirectorObra />}>
            <Route path="inicio" element={<InicioObras />} />
            <Route path="listado-incidencias" element={<ListaIncidencias />} />
            <Route path="editar-incidencias/:id" element={<EditarIncidencias/>} />
            <Route path="crear-cuadrillas" element={<CrearCuadrillas />} />
            <Route path="cuadrilla/:id" element={<AsignarCuadrilla />} />
            <Route path="tareas-incidencias/:id" element={<TareasIncidencias/>} />
            <Route path="documentacion" element={<Documentacion />} />
          </Route>
          {/* Enrutamiento gestor territorial */}
          <Route path="gestor-territorial" element={<GestorTerritorial />}>
            <Route path="inicio" element={<InicioGestor />} />
            <Route path="crear-formularios" element={<CrearFormularios />} />
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