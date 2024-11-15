import axios from 'axios';

const FormulariosApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/formularios/' 
});

export const getAllFormularios = () => FormulariosApi.get('formularios/'); 
  
export const createFormularios = (formularios) => FormulariosApi.post('formularios/', formularios); 
