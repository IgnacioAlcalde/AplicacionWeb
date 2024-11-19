import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoles, getAllRoles } from '../../api/usuarios.api';
import '../../App.css';
import '../../componentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CrearRoles() {
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
    console.log("Datos a enviar:", data); // Verifica que aquí se muestre el nombre del rol
  
    try {
      const res = await createRoles(data);
      console.log(res);
      setSuccessMessage("Rol creado exitosamente!");
      // Redirigir o mostrar mensaje de éxito
    } catch (error) {
      console.error("Error al crear Rol:", error.response?.data || error.message);
    }
    alert("Rol creado exitosamente");
    reset();
  };
  
  
  
  

  const navegarInicio = () => navigate('/director-municipalidad/inicio');

  return (
    <div className="text-black">
        <div className="card card-body text-black">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="card-title">Creación de Roles</h2>
                
            </div>
            <hr/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                <label htmlFor="nombre" className='ms-1'>Nombre del nuevo Rol:</label>
                <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    placeholder="Ingresa el nombre del Rol"
                    {...register('nombre', { required: "El nombre es obligatorio" })}
                />
                {errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}
                </div>
            
                <div className="form-group mt-3">
                <button type="submit" className="btn btn-navegacion">Crear Rol</button>
                <button type="button" className="btn btn-navegacion mx-2" onClick={() => reset()}>Limpiar</button>
                <button type="button" className="btn btn-navegacion" onClick={navegarInicio}>Cancelar</button>
                </div>
            </form>

        </div>

        <div className='card card-body mt-2'>
        <table className="table table-hover table-striped table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th className="fs-2 text-center">Roles Disponibles</th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0 ? (
              roles.map((rol) => (
                <tr key={rol.id}>
                  <td className="fs-4 text-center">{rol.nombre}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center text-muted fs-5">No hay roles disponibles</td>
              </tr>
            )}
          </tbody>
        </table>


        </div>


    </div>
    
  );
}


