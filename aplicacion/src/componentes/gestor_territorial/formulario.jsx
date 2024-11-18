import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createIncidencias, getAllTipoFormularios } from '../../api/usuarios.api';
import React, { useState, useEffect } from 'react';
import '../../App.css';
import '../../componentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CrearFormulario() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [formulario, setFormularios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        const response = await getAllFormularios();
        console.log("Respuesta de la API:", response);
        if (Array.isArray(response.data)) {
          setFormularios(response.data);
        } else {
          console.error("La respuesta no es un array:", response);
          setFormularios([]);
        }
      } catch (error) {
        console.error("Error al cargar formulario:", error);
        setFormularios([]);
      }
    };

    fetchFormularios();
  }, []);

  const onSubmit = async (data) => {
    data.contraseña = data.run; // Establecer el valor de la contraseña como el RUN
    console.log("Datos a enviar:", data); // Verifica que aquí se muestre el nombre del rol
  
    try {
      const res = await createFormularios(data);
      console.log(res);
      setSuccessMessage("Formulario creado exitosamente!");
      reset();
    } catch (error) {
      console.error("Error al crear formulario:", error.response?.data || error.message);
    }
  };

  const navegarInicio = () => navigate('/gestor-territorial/inicio');
  return (
    <div className="card card-body text-black">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="card-title">Formulario de Incidencias</h2>
      </div>
      <hr/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo Incidencia:</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            placeholder="Ingresa el titulo de la incidencia"
            {...register('titulo', { required: "El titulo es obligatorio" })}
          />
          {errors.titulo && <span className="text-danger">{errors.titulo.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="run">RUT:</label>
          <input
            type="text"
            className="form-control"
            id="rut"
            placeholder="Ingresa el RUT del usuario: 12345678-9"
            {...register('rut', {
              required: "El RUT es obligatorio",
              maxLength: {
                value: 10,
                message: "El RUT no debe exceder los 10 caracteres",
              },
            })}
          />
          {errors.rut && <span className="text-danger">{errors.rut.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            className="form-control"
            id="fecha"
            {...register('fecha', { required: "La fecha es obligatoria" })}
          />
          {errors.fecha && <span className="text-danger">{errors.fecha.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            className="form-control"
            id="correo"
            placeholder="Ingresa el correo"
            {...register('correo', { required: "El correo es obligatorio" })}
          />
          {errors.correo && <span className="text-danger">{errors.correo.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="localizacion">Localización:</label>
          <input
            type="localizacioni"
            className="form-control"
            id="localizacion"
            placeholder="Ingresa el localizacion"
            {...register('localizacion', { required: "La localizacion es obligatorio" })}
          />
          {errors.localizacion && <span className="text-danger">{errors.localizacion.message}</span>}
        </div>
        <div className="form-group mt-3">
          <button type="submit" className="btn btn-navegacion">Guardar formulario</button>
          <button type="button" className="btn btn-navegacion mx-2" onClick={() => reset()}>Limpiar</button>
          <button type="button" className="btn btn-navegacion" onClick={navegarInicio}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}