import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAllCuadrillas, createCuadrillas, updateCuadrillas, deleteCuadrillas } from "../../api/usuarios.api"; // Asegúrate de que estas funciones existan
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../componentes.css";

export default function crear_cuadrillas() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [cuadrillas, setCuadrillas] = useState([]);
  const [selectedCuadrilla, setSelectedCuadrilla] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCuadrillas = async () => {
      try {
        const response = await getAllCuadrillas();
        if (Array.isArray(response.data)) {
          setCuadrillas(response.data);
        } else {
          console.error("Error al obtener las cuadrillas");
        }
      } catch (error) {
        console.error("Error al obtener cuadrillas:", error);
      }
    };
    fetchCuadrillas();
  }, []);

  const onSubmit = async (data) => {
    if (isEditing) {
      await updateCuadrillas(selectedCuadrilla.id, data);
      alert("Cuadrilla actualizada con éxito");
    } else {
      await createCuadrillas(data);
      alert("Cuadrilla creada con éxito");
    }
    reset();
    setSelectedCuadrilla(null);
    setIsEditing(false);
    // Vuelve a cargar las cuadrillas después de crear o actualizar
    const updatedCuadrillas = await getAllCuadrillas();
    setCuadrillas(updatedCuadrillas.data); // Asumiendo que la respuesta tiene los datos en 'data'
  };

  const handleEdit = (cuadrilla) => {
    setSelectedCuadrilla(cuadrilla);
    setIsEditing(true);
    reset(cuadrilla); // Rellenamos el formulario con los datos de la cuadrilla a editar
  };

  const handleCancel = () => {
    setIsEditing(false); // Restablecer el estado a creación
    reset(); // Limpiar el formulario
  };
  const navigate = useNavigate();
    const asignarMiembros = (id) => {
        navigate(`/director-obra/cuadrilla/${id}`); // Redirigir a la ruta de editar usuario con el ID
    };

  return (
    <div className="card card-body text-black">
      <div className="d-flex justify-content-between">
        <h2>{isEditing ? "Editar Cuadrilla" : "Crear Cuadrilla"}</h2>
        {/* Botón "Editar Cuadrilla" */}
        {!isEditing && (
          <button className="btn btn-navegacion" onClick={() => {setIsEditing(true);window.location.reload();}}>
            Editar Cuadrilla
          </button>
        )}
      </div>
      <div className="mt-4">
        {/* Mostrar solo cuando se está en modo edición */}
        {isEditing && (
          <>
            <h5>Seleccionar Cuadrilla para Editar:</h5>
            <select
              className="form-control"
              onChange={(e) => handleEdit(JSON.parse(e.target.value))}
              value={selectedCuadrilla ? JSON.stringify(selectedCuadrilla) : ""}
            >
              <option value="">Selecciona una cuadrilla</option>
              {cuadrillas.map((cuadrilla) => (
                <option key={cuadrilla.id} value={JSON.stringify(cuadrilla)}>
                  {cuadrilla.nombre}
                </option>
              ))}
            </select>
            <hr />
          </>
        )}
      </div>

      {/* Mostrar el formulario de creación siempre */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre de la Cuadrilla:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Nombre de la cuadrilla"
            {...register('nombre', { required: "El nombre es obligatorio" })}
          />
          {errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="area_trabajo">Área de Trabajo:</label>
          <input
            type="text"
            className="form-control"
            id="area_trabajo"
            placeholder="Área de trabajo"
            {...register('area_trabajo', { required: "El área de trabajo es obligatoria" })}
          />
          {errors.area_trabajo && <span className="text-danger">{errors.area_trabajo.message}</span>}
        </div>

        {/* Campo para actualizar el estado de la cuadrilla */}
        {isEditing && (
          <div className="form-group">
            <label htmlFor="estado">Estado:</label>
            <select
              className="form-control"
              id="estado"
              {...register('estado', { required: "El estado es obligatorio" })}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Suspendido">Suspendido</option>
            </select>
            {errors.estado && <span className="text-danger">{errors.estado.message}</span>}
          </div>
        )}

        <div className="form-group mt-3">
          <button type="submit" className="btn btn-navegacion">
            {isEditing ? "Actualizar Cuadrilla" : "Crear Cuadrilla"}
          </button>
          <button type="button" className="btn btn-navegacion mx-2" onClick={() => reset()}>
            Limpiar
          </button>
          {/* Botón de Cancelar, solo visible cuando se está editando */}
          {isEditing && (
            <button type="button" className="btn btn-navegacion mx-2" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
          <hr />
      {/* Mostrar lista de cuadrillas abajo en formato de tabla */}
      <div className="mt-4">
        <h3>Lista de Cuadrillas:</h3>
        <table className="table table-striped w-100">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Área de Trabajo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cuadrillas.length > 0 ? (
              cuadrillas.map((cuadrilla) => (
                <tr key={cuadrilla.id}>
                  <td>{cuadrilla.nombre}</td>
                  <td>{cuadrilla.area_trabajo}</td>
                  <td>{cuadrilla.estado}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEdit(cuadrilla)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={async () => {
                        const accepted = window.confirm("¿Estás seguro que deseas eliminar la cuadrilla?");
                        if (accepted) {
                          await deleteCuadrillas(cuadrilla.id);
                          alert("Cuadrilla eliminada exitosamente");
                          window.location.reload();
                        } else {
                          alert("Operación cancelada");
                        }
                      }}
                    >
                      Eliminar
                    </button>
                    <button className="btn btn-success"onClick={() => asignarMiembros(cuadrilla.id)}>Asignar miembros</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay cuadrillas disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}