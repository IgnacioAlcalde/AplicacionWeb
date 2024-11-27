import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/formularios/api/formularios/', 
});


const submitFormulario = async (formData) => {
    try {
        
        const response = await api.post('', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  
            },
        });
        return response.data;  
    } catch (error) {
        console.error('Error en la API:', error);
        throw error;
    }
};

const obtencionFormularios = async () => {
    try {
        
        const response = await api.get('');
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los formularios:', error);
        throw error;
    }
};

const borrarFormulario = (_id) => api.delete(`${_id}/`);

const obtenerFormularioDetalle = async (_id) => {
    try {
        const url = `http://127.0.0.1:8000/formularios/api/formularios/detalle/${_id}/`;

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error al obtener formulario:', error);
      throw error;
    }
  };

  const editarFormulario = async (_id, formularioData) => {
    try {
      const url = `http://127.0.0.1:8000/formularios/api/formularios/detalle/${_id}/`;
      const response = await axios.put(url, formularioData);
      return response.data;  
    } catch (error) {
      console.error('Error al editar formulario:', error);
      throw error;
    }
  };

export { api, submitFormulario, obtencionFormularios, borrarFormulario, obtenerFormularioDetalle, editarFormulario };
