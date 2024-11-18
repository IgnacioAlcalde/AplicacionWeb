import axios from 'axios';

const UsuariosApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/'  // Base URL con barra final
});

//POST
export const getAllUsuarios = () => UsuariosApi.get('usuarios/');
export const getAllRoles = () => UsuariosApi.get('roles/');
export const getAllTipoFormularios = () => UsuariosApi.get('tiposformulario/');
export const getAllIncidencias = () => UsuariosApi.get('incidencias/');
export const getAllCuadrillas = () => UsuariosApi.get('cuadrillas/');
export const getAllIntegrantesCuadrillas = () => UsuariosApi.get('integrantescuadrillas/');
export const getAllTareas = () => UsuariosApi.get('tareas/');

//CREATE
export const createUsuarios = (usuario) => UsuariosApi.post('usuarios/', usuario);
export const createRoles = (rol) => UsuariosApi.post('roles/', rol); 
export const createIncidencias = (incidencia) => UsuariosApi.post('incidencias/', incidencia);
export const createCuadrillas = (cuadrilla) => UsuariosApi.post('cuadrillas/', cuadrilla);
export const createIntegrantesCuadrillas = (integrantescuadrilla) => UsuariosApi.post('integrantescuadrillas/', integrantescuadrilla);
export const createTareas = (tarea) => UsuariosApi.post('tareas/', tarea);
export const createTiposFormularios = (tiposformulario) => UsuariosApi.post('tiposformulario/', tiposformulario);

//DELETE
export const deleteUsuarios = (id) => UsuariosApi.delete(`usuarios/${id}/`);
export const deleteRoles = (id) => UsuariosApi.delete(`roles/${id}/`);
export const deleteIncidencias = (id) => UsuariosApi.delete(`incidencias/${id}/`);
export const deleteCuadrillas = (id) => UsuariosApi.delete(`cuadrillas/${id}/`);
export const deleteIntegrantesCuadrillas = (id) => UsuariosApi.delete(`integrantescuadrillas/${id}/`);
export const deleteTareas = (id) => UsuariosApi.delete(`tareas/${id}/`);
export const deleteTiposFormularios = (id) => UsuariosApi.delete(`tiposformulario/${id}/`);

//UPDATE
export const updateUsuarios = (id, usuario) => UsuariosApi.put(`usuarios/${id}/`, usuario);
export const updateRoles = (id, rol) => UsuariosApi.put(`roles/${id}/`, rol);
export const updateIncidencias = (id, incidencia) => UsuariosApi.put(`incidencias/${id}/`, incidencia);
export const updateCuadrillas = (id, cuadrilla) => UsuariosApi.put(`cuadrillas/${id}/`, cuadrilla);
export const updateIntegrantesCuadrillas = (id, integrantescuadrilla) => UsuariosApi.put(`integrantescuadrillas/${id}/`, integrantescuadrilla);
export const updateTareas = (id, tarea) => UsuariosApi.put(`tareas/${id}/`, tarea);
export const updateTiposFormularios = (id, tiposformulario) => UsuariosApi.put(`tiposformulario/${id}/`, tiposformulario);

//GET BY ID
export const getUsuario = (id) => UsuariosApi.get(`usuarios/${id}`);