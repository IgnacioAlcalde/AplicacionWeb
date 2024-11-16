import axios from 'axios';

const UsuariosApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/'  // Base URL con barra final
});

// Obtener todos los usuarios
export const getAllUsuarios = () => UsuariosApi.get('usuarios/'); // Asegúrate de que termina con '/'
  
// Crear un nuevo usuario
export const createUsuarios = (usuario) => UsuariosApi.post('usuarios/', usuario); // Asegúrate de que termina con '/'

export const deleteUsuarios = (id) => UsuariosApi.delete(`usuarios/${id}/`);

// Obtener todos los roles
export const getAllRoles = () => UsuariosApi.get('roles/'); // Asegúrate de que termina con '/'

// Crear un nuevo rol
export const createRoles = (rol) => UsuariosApi.post('roles/', rol); // Asegúrate de que termina con '/'
