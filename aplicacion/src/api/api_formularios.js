import axios from 'axios';

// Configura Axios con la URL base para tu API
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/formularios/api/formularios/', // Esta es la URL base de tu API
});

// Realiza un método de POST para enviar el formulario con 'formData'
const submitFormulario = async (formData) => {
    try {
        // Envía la solicitud POST con los datos del formulario y la imagen (si la hay)
        const response = await api.post('', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Es necesario para enviar archivos
            },
        });
        return response.data;  // Regresa los datos de la respuesta
    } catch (error) {
        console.error('Error en la API:', error);
        throw error;
    }
};

export { api, submitFormulario };
