import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { submitFormulario } from "../../api/api_formularios"; // Importa la función para enviar el formulario
import "../../App.css";
import "../../componentes.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { getAllTipoFormularios, getAllUsuarios } from "../../api/usuarios.api";

const Formulario = () => {
  const {
    register,
    formState: { errors },
    reset,
  } = useForm();
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [gravedad, setGravedad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [estado, setEstado] = useState("");
  const [run, setRun] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState({});
  const [tipoFormularios, setTipoFormularios] = useState([]);
  const [tipoFormularioSeleccionado, setTipoFormularioSeleccionado] =
    useState("");
  const [gestores, setGestores] = useState([]);
  const navigate = useNavigate();
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
  const limpiar = () => {
    setTitulo("");
    setFecha("");
    setLocalizacion("");
    setGravedad("");
    setDescripcion("");
    setEstado("");
    setRun("");
    setCorreo("");
    setImagen(null);
    setTipoFormularioSeleccionado("");
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

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "imagen") {
      setImagen(e.target.files[0]);
    } else {
      switch (name) {
        case "titulo":
          setTitulo(value);
          break;
        case "fecha":
          setFecha(value);
          break;
        case "localizacion":
          setLocalizacion(value);
          break;
        case "gravedad":
          setGravedad(value);
          break;
        case "descripcion":
          setDescripcion(value);
          break;
        case "estado":
          setEstado(value);
          break;
        case "run":
          setRun(value);
          break;
        case "correo":
          setCorreo(value);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    fetchGestores();
    fetchTipoFormularios();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    try {
      // Obtener lista de gestores para validar el run
      if (!titulo) {
        alert("El título es obligatorio.");
        return;
      }

      if (!tipoFormularioSeleccionado) {
        alert("Debe seleccionar un tipo de formulario.");
        return;
      }

      if (!fecha) {
        alert("Debe dar una fecha");
        return;
      }

      if (!localizacion) {
        alert("Debe dar una localizacion.");
        return;
      }

      if (!gravedad) {
        alert("Debe seleccionar la gravedad.");
        return;
      }

      if (!descripcion) {
        alert("Debe escribir una descripcion.");
        return;
      }

      if (!estado) {
        alert("Debe seleccionar el estado de la incidencia");
        return;
      }
      if (!run) {
        alert("Debe escribir un run de gestor");
        return;
      }
      if (!correo) {
        alert("Debe escribir un correo");
        return;
      }

      await fetchGestores();

      const gestor = gestores.find((g) => g.run === run);
      if (!gestor) {
        nuevosErrores.run = "El RUN ingresado no pertenece a un gestor.";
      } else if (gestor.correo !== correo) {
        // Validar si el correo corresponde al RUN ingresado
        nuevosErrores.correo =
          "El correo ingresado no coincide con el RUN proporcionado.";
      }

      if (Object.keys(nuevosErrores).length > 0) {
        setErrores(nuevosErrores);
        console.log(nuevosErrores);
        return;
      }

      setErrores({});
      // Si todas las validaciones pasan, continuar con el envío
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("fecha", fecha);
      formData.append("localizacion", localizacion);
      formData.append("gravedad", gravedad);
      formData.append("descripcion", descripcion);
      formData.append("estado", estado);
      formData.append("run", run);
      formData.append("correo", correo);
      formData.append("tipoFormulario", tipoFormularioSeleccionado);

      // Añadir la imagen al FormData
      if (imagen) {
        formData.append("imagen", imagen);
      }

      const respuesta = await submitFormulario(formData);
      setMensaje("Formulario enviado correctamente");
      console.log("Respuesta de la API:", respuesta);
    } catch (error) {
      console.error("Error al validar o enviar formulario:", error);
      setMensaje("Error al enviar el formulario.");
    }
    setTitulo("");
    setFecha("");
    setLocalizacion("");
    setGravedad("");
    setDescripcion("");
    setEstado("");
    setRun("");
    setCorreo("");
    setImagen(null);
    alert("Incidencia creada exitosamente");
    setTipoFormularioSeleccionado("");
  };

  const navegarInicio = () => navigate("/gestor-territorial/inicio");
  return (
    <div className="card card-body text-black">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="card-title">Formulario de Incidencias</h2>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={titulo}
            {...register("titulo", { required: "El título es obligatorio" })}
            onChange={handleChange}
          />
          {errors.titulo && (
            <small className="text-danger">{errors.titulo.message}</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="tipoFormulario">Tipo de Formulario:</label>
          <select
            className="form-control"
            id="tipoFormulario"
            name="tipoFormulario"
            value={tipoFormularioSeleccionado}
            onChange={(e) => setTipoFormularioSeleccionado(e.target.value)}
          >
            <option value="">Seleccione un tipo</option>
            {tipoFormularios.map((tipoFormulario) => (
              <option key={tipoFormulario.id} value={tipoFormulario.nombre}>
                {tipoFormulario.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={fecha}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Localización:</label>
          <input
            type="text"
            name="localizacion"
            value={localizacion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gravedad">Gravedad:</label>
          <select
            className="form-control"
            id="gravedad"
            name="gravedad"
            value={gravedad}
            onChange={handleChange}
          >
            <option value="">Seleccione el nivel de gravedad</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div className="form-group">
          <label>Descripcion:</label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input type="file" name="imagen" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select
            className="form-control"
            id="estado"
            name="estado"
            value={estado}
            onChange={handleChange}
          >
            <option value="">Seleccione un estado</option>
            <option value="Sin iniciar">Sin iniciar</option>
            <option value="En progreso">En progeso</option>
            <option value="Finalizado">Finalizado</option>
          </select>
        </div>
        <div className="form-group">
          <label>Run, sin puntos y con guion: </label>
          <input
            type="text"
            name="run"
            placeholder="00000000-0"
            value={run}
            onChange={handleChange}
            className={errores.run ? "input-error" : ""}
          />
          {errores.run && <small className="error-text">{errores.run}</small>}
        </div>
        <div className="form-group">
          <label>Correo:</label>
          <input
            type="email"
            name="correo"
            value={correo}
            onChange={handleChange}
            className={errores.correo ? "input-error" : ""}
          />
          {errores.correo && (
            <small className="error-text">{errores.correo}</small>
          )}
        </div>
        <div className="form-group mt-3">
          <button type="submit" className="btn btn-navegacion">
            Guardar formulario
          </button>
          <button
            type="button"
            className="btn btn-navegacion mx-2"
            onClick={() => limpiar()}
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
};

export default Formulario;
