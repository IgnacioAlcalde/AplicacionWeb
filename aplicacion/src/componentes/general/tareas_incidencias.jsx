import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../componentes.css";
import "../../App.css";
import {
  getAllCuadrillas,
  getAllTareas,
  createTareas,
  deleteTareas,
  updateTareas
} from "../../api/usuarios.api";

export default function CrearTareas() {
  const { id } = useParams(); // ID de la incidencia
  const navigate = useNavigate();

  const [cuadrillas, setCuadrillas] = useState([]); // Cuadrillas disponibles
  const [tareas, setTareas] = useState([]); // Tareas asociadas a la incidencia
  const [nombreTarea, setNombreTarea] = useState(""); // Nombre de la tarea
  const [descripcionTarea, setDescripcionTarea] = useState(""); // Descripción de la tarea
  const [cuadrillaSeleccionada, setCuadrillaSeleccionada] = useState(""); // Cuadrilla seleccionada
  const [estado, setEstado] = useState(""); // Estado de la tarea
  const [editando, setEditando] = useState(false); // Modo edición
  const [idTareaEditando, setIdTareaEditando] = useState(null); // ID de la tarea en edición

  // Cargar las cuadrillas y las tareas de la incidencia
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const cuadrillasData = await getAllCuadrillas();
        setCuadrillas(cuadrillasData.data);
  
        const tareasData = await getAllTareas();
        const tareasFiltradas = tareasData.data.filter(
          (tarea) => parseInt(tarea.incidencia) === parseInt(id)
        );
        setTareas(tareasFiltradas);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
  
    console.log("ID de la incidencia:", id);
    if (!id || isNaN(id)) {
      console.error("El ID de la incidencia no es válido.");
      return;
    }
  
    cargarDatos();
  }, [id]);
  
  const handleGuardarTarea = async (e) => {
    e.preventDefault();
  
    if (!nombreTarea || !descripcionTarea || !cuadrillaSeleccionada || (editando && !estado)) {
      alert("Por favor complete todos los campos.");
      return;
    }
  
    try {
      if (editando) {
        await updateTareas(idTareaEditando, {
          titulo: nombreTarea,
          descripcion: descripcionTarea,
          cuadrilla: parseInt(cuadrillaSeleccionada),
          estado,
          incidencia: parseInt(id),
        });
        alert("Tarea actualizada correctamente.");
      } else {
        await createTareas({
          titulo: nombreTarea,
          descripcion: descripcionTarea,
          cuadrilla: parseInt(cuadrillaSeleccionada),
          incidencia: parseInt(id),
        });
        alert("Tarea creada correctamente.");
      }
  
      const tareasData = await getAllTareas();
      const tareasFiltradas = tareasData.data.filter(
        (tarea) => parseInt(tarea.incidencia) === parseInt(id)
      );
      setTareas(tareasFiltradas);
  
      resetFormulario();
    } catch (error) {
      console.error("Detalles del error del backend:", error.response?.data || error.message);
      alert("Error al guardar tarea.");
    }
  };
  

  // Manejar edición
  const handleEditarTarea = (tarea) => {
    setNombreTarea(tarea.titulo);
    setDescripcionTarea(tarea.descripcion);
    setCuadrillaSeleccionada(tarea.cuadrilla);
    setEstado(tarea.estado || "sin iniciar");
    setIdTareaEditando(tarea.id);
    setEditando(true);
  };

  // Cancelar edición
  const handleCancelarEdicion = () => {
    resetFormulario();
  };

  // Resetear formulario
  const resetFormulario = () => {
    setNombreTarea("");
    setDescripcionTarea("");
    setCuadrillaSeleccionada("");
    setEstado("");
    setEditando(false);
    setIdTareaEditando(null);
  };

  // Eliminar tarea
  const handleEliminarTarea = async (tareaId) => {
    try {
      await deleteTareas(tareaId);
      const tareasData = await getAllTareas();
      const tareasFiltradas = tareasData.data.filter(tarea => tarea.incidencia === parseInt(id));
      setTareas(tareasFiltradas);
      alert("Tarea eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      alert("Error al eliminar tarea.");
    }
  };

  return (
    <div>
      <div className="card card-body text-black">
        <div className="d-flex justify-content-between align-items-center">
          <h3>{editando ? "Editar tarea" : "Crear tarea"}</h3>
          <button className="btn btn-navegacion" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
        <hr />
        <div>
          <h5>Formulario para {editando ? "editar" : "crear"} tarea</h5>
          <form onSubmit={handleGuardarTarea}>
            <div className="form-group">
              <label htmlFor="titulo">Titulo de la tarea:</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                value={nombreTarea}
                onChange={(e) => setNombreTarea(e.target.value)}
                placeholder="Nombre de la tarea"
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea
                className="form-control"
                id="descripcion"
                value={descripcionTarea}
                onChange={(e) => setDescripcionTarea(e.target.value)}
                placeholder="Descripción de la tarea"
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="cuadrilla">Seleccionar cuadrilla:</label>
              <select
                id="cuadrilla"
                className="form-control"
                value={cuadrillaSeleccionada}
                onChange={(e) => setCuadrillaSeleccionada(e.target.value)}
              >
                <option value="">Seleccione una cuadrilla</option>
                {cuadrillas.map((cuadrilla) => (
                  <option key={cuadrilla.id} value={cuadrilla.id}>
                    {cuadrilla.nombre}
                  </option>
                ))}
              </select>
            </div>
            {editando && (
              <div className="form-group mt-2">
                <label htmlFor="estado">Estado:</label>
                <select
                  id="estado"
                  className="form-control"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="sin iniciar">Sin iniciar</option>
                  <option value="en progreso">En progreso</option>
                  <option value="finalizado">Finalizado</option>
                  <option value="abandonado">Abandonado</option>
                </select>
              </div>
            )}
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-navegacion">
                {editando ? "Subir cambios" : "Crear Tarea"}
              </button>
              {editando && (
                <button
                  type="button"
                  className="btn btn-navegacion"
                  onClick={handleCancelarEdicion}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="card card-body text-black mt-4">
        <h3>Lista de tareas</h3>
        <hr />
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cuadrilla</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((tarea) => (
              <tr key={tarea.id}>
                <td>{tarea.titulo}</td>
                <td>{tarea.descripcion}</td>
                <td>{tarea.cuadrilla_nombre}</td>
                <td>{tarea.estado}</td>
                <td>
                  <button
                    className="btn btn-navegacion"
                    onClick={() => handleEditarTarea(tarea)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-navegacion ms-2"
                    onClick={() => handleEliminarTarea(tarea.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
