import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsuario, getAllRoles, updateUsuarios } from '../../api/usuarios.api'; // Importa la función getUsuario
import '../../App.css';
import '../../componentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function editar_usuario() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [roles, setRoles] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getAllRoles();
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

    const fetchUsuario = async () => {
      try {
        const response = await getUsuario(id); // Usamos la función getUsuario con el ID
        if (response.data) {
          setUsuario(response.data);
          reset(response.data);  // Rellenamos el formulario con los datos actuales del usuario
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        setError("Error al cargar el usuario.");
      }
    };

    fetchRoles();
    fetchUsuario();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await updateUsuarios(id, data); // Llamada a la función updateUsuarios
      if (response.status === 200) {
        alert("Usuario actualizado exitosamente");
        navigate('/director-municipalidad/lista-usuarios');
      } else {
        alert("Hubo un error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Hubo un error al actualizar el usuario.");
    }
  };

  const navegar = (ruta) => navigate(ruta);

  if (!usuario) {
    return <div>Cargando usuario...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="card card-body text-black">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="card-title">Editar usuario</h2>
      </div>
      <hr />
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
            placeholder="Ingresa el RUN del usuario"
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
          <button type="submit" className="btn btn-navegacion">Guardar cambios</button>
          <button type="button" className="btn btn-navegacion mx-2" onClick={() => reset()}>Limpiar</button>
          <button type="button" className="btn btn-navegacion" onClick={() => navegar('/director-municipalidad/inicio')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
