import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  createIncidencias,
  getAllIncidencias,
  getAllTipoFormularios,
  getAllUsuarios,
} from "../../api/usuarios.api";
import React, { useState, useEffect } from "react";
import "../../App.css";
import "../../componentes.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CrearFormulario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [formulario, setFormularios] = useState([]);
  const [tipoFormularios, setTipoFormularios] = useState([]);
  const [gestores, setGestores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        const response = await getAllIncidencias();
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
    const fetchGestores = async () => {
      try {
        const response = await getAllUsuarios();

        const gestores = response.data.filter(
          (usuario) => usuario.rol === "Gestor territorial"
        );

        if (Array.isArray(gestores)) {
          setGestores(gestores);
        }
      } catch (error) {
        console.error("Error al cargar gestores:", error);
      }
    };
    const fetchTipoFormularios = async () => {
      try {
        const response = await getAllTipoFormularios();

        if (Array.isArray(response.data)) {
          setTipoFormularios(response.data);
        }
      } catch (error) {
        console.error("Error al cargar tipos de formularios:", error);
      }
    };
    fetchTipoFormularios();
    fetchGestores();
    fetchFormularios();
  }, []);

  const onSubmit = async (data) => {
    data.contraseña = data.run; // Establecer el valor de la contraseña como el RUN
    console.log("Datos a enviar:", data); // Verifica que aquí se muestre el nombre del rol

    try {
      const res = await createIncidencias(data);
      console.log(res);
      setSuccessMessage("Formulario creado exitosamente!");
      reset();
    } catch (error) {
      console.error(
        "Error al crear formulario:",
        error.response?.data || error.message
      );
    }
    alert("Incidencia creada exitosamente");
    reset();
  };

  const navegarInicio = () => navigate("/gestor-territorial/inicio");
  return (
    <div className="card card-body text-black">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="card-title">Formulario de Incidencias</h2>
      </div>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo Incidencia:</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            placeholder="Ingresa el titulo de la incidencia"
            {...register("titulo", { required: "El titulo es obligatorio" })}
          />
          {errors.titulo && (
            <span className="text-danger">{errors.titulo.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="tipo">Tipo de Formulario:</label>
          <select
            className="form-control"
            id="tipo"
            {...register("tipo", {
              required: "El tipo de formulario es obligatorio",
            })}
          >
            <option value="">Seleccione un tipo de formulario</option>
            {tipoFormularios.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
          {errors.tipo && (
            <span className="text-danger">{errors.tipo.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            className="form-control"
            id="fecha"
            {...register("fecha", { required: "La fecha es obligatoria" })}
          />
          {errors.fecha && (
            <span className="text-danger">{errors.fecha.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="localizacion">Localización:</label>
          <input
            type="localizacioni"
            className="form-control"
            id="localizacion"
            placeholder="Ingresa el localizacion"
            {...register("localizacion", {
              required: "La localizacion es obligatorio",
            })}
          />
          {errors.localizacion && (
            <span className="text-danger">{errors.localizacion.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="gravedad">Gravedad:</label>
          <select
            className="form-control"
            id="gravedad"
            {...register("gravedad", {
              required: "El nivel de gravedad es obligatorio",
            })}
          >
            <option value="">Seleccione el nivel de gravedad</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
          {errors.gravedad && (
            <span className="text-danger">{errors.gravedad.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            className="form-control"
            id="descripcion"
            placeholder="Ingresa una descripción de la incidencia"
            {...register("descripcion", {
              required: "La descripción es obligatoria",
            })}
          />
          {errors.descripcion && (
            <span className="text-danger">{errors.descripcion.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Agregar Imagen (opcional):</label>
          <input
            type="file"
            className="form-control"
            id="imagen"
            {...register("imagen")} // Esto debería registrar el archivo correctamente
          />
          {errors.imagen && (
            <span className="text-danger">{errors.imagen.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select
            className="form-control"
            id="estado"
            {...register("estado", { required: "El estado es obligatorio" })}
          >
            <option value="">Seleccione un estado</option>
            <option value="Sin iniciar">Sin iniciar</option>
            <option value="En progreso">En progreso</option>
            <option value="Finalizado">Finalizado</option>
          </select>
          {errors.estado && (
            <span className="text-danger">{errors.estado.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="gestor">Gestor Territorial:</label>
          <select
            className="form-control"
            id="gestor"
            {...register("gestor", {
              required: "El gestor territorial es obligatorio",
            })}
          >
            <option value="">Seleccione un gestor</option>
            {gestores.map((gestor) => (
              <option key={gestor.id} value={gestor.id}>
                {gestor.nombre}
              </option>
            ))}
          </select>
          {errors.gestor && (
            <span className="text-danger">{errors.gestor.message}</span>
          )}
        </div>
        <div className="form-group mt-3">
          <button type="submit" className="btn btn-navegacion">
            Guardar formulario
          </button>
          <button
            type="button"
            className="btn btn-navegacion mx-2"
            onClick={() => reset()}
          >
            Limpiar
          </button>
          <button
            type="button"
            className="btn btn-navegacion"
            onClick={navegarInicio}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
