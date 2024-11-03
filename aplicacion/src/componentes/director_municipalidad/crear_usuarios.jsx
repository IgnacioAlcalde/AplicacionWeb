import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUsuarios, getAllRoles } from '../../api/usuarios.api';
import '../../inicio.css';
import '../../componentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CrearUsuarios() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getAllRoles();
        console.log("Respuesta de la API:", response);
        if (Array.isArray(response.data)) {
          setRoles(response.data);
        } else {
          console.error("La respuesta no es un array:", response);
          setRoles([]);
        }
      } catch (error) {
        console.error("Error al cargar roles:", error);
        setRoles([]);
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async (data) => {
    data.contraseña = data.run; // Establecer el valor de la contraseña como el RUN
    console.log("Datos a enviar:", data); // Verifica que aquí se muestre el nombre del rol
  
    try {
      const res = await createUsuarios(data);
      console.log(res);
      // Redirigir o mostrar mensaje de éxito
    } catch (error) {
      console.error("Error al crear usuario:", error.response?.data || error.message);
    }
  };
  
  
  
  

  const navegarInicio = () => navigate('/director-municipalidad/inicio');
  const navegarCargaMasiva = () => navigate('/director-municipalidad/carga-masiva');

  return (
    <div className="card card-body text-black">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="card-title">Creación de usuarios</h2>
        <button className="btn btn-navegacion" onClick={navegarCargaMasiva}>Carga masiva</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Ingresa el nombre del usuario"
            {...register('nombre', { required: "El nombre es obligatorio" })}
          />
          {errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            placeholder="Ingresa el apellido del usuario"
            {...register('apellido', { required: "El apellido es obligatorio" })}
          />
          {errors.apellido && <span className="text-danger">{errors.apellido.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="run">RUN:</label>
          <input
            type="text"
            className="form-control"
            id="run"
            placeholder="Ingresa el RUN del usuario: 12345678-9"
            {...register('run', {
              required: "El RUN es obligatorio",
              maxLength: {
                value: 10,
                message: "El RUN no debe exceder los 10 caracteres",
              },
            })}
          />
          {errors.run && <span className="text-danger">{errors.run.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            className="form-control"
            id="fecha_nacimiento"
            {...register('fecha_nacimiento', { required: "La fecha de nacimiento es obligatoria" })}
          />
          {errors.fecha_nacimiento && <span className="text-danger">{errors.fecha_nacimiento.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            className="form-control"
            id="correo"
            placeholder="Ingresa el correo del usuario"
            {...register('correo', { required: "El correo es obligatorio" })}
          />
          {errors.correo && <span className="text-danger">{errors.correo.message}</span>}
        </div>
        <input
          type="hidden"
          {...register('contraseña')}
        />
        <div className="form-group">
          <label htmlFor="rol">Rol:</label>
          <select
            className="form-control"
            id="rol"
            {...register('rol', { required: "El rol es obligatorio" })}
          >
            <option value="">Selecciona un rol</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.nombre}>{rol.nombre}</option>
            ))}
          </select>
          {errors.rol && <span className="text-danger">{errors.rol.message}</span>}
        </div>
        <div className="form-group mt-3">
          <button type="submit" className="btn btn-primary">Guardar usuario</button>
          <button type="button" className="btn btn-secondary mx-2" onClick={() => reset()}>Limpiar</button>
          <button type="button" className="btn btn-danger" onClick={navegarInicio}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
