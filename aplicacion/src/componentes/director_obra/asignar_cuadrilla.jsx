import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../componentes.css";
import "../../App.css";
import {
  getAllUsuarios,
  getAllIntegrantesCuadrillas,
  createIntegrantesCuadrillas,
  deleteIntegrantesCuadrillas,
  getUsuario,  // Asegúrate de tener esta API para obtener los detalles completos de un usuario
} from "../../api/usuarios.api";

export default function AsignarCuadrilla() {
  const { id } = useParams(); // ID de la cuadrilla
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]); // Usuarios disponibles
  const [integrantes, setIntegrantes] = useState([]); // Miembros de la cuadrilla
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(""); // Usuario a asignar

  // Cargar todos los usuarios y los integrantes de todas las cuadrillas
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Cargar usuarios
        const usuariosData = await getAllUsuarios();
        setUsuarios(usuariosData.data);

        // Cargar integrantes y filtrar por cuadrilla
        const integrantesData = await getAllIntegrantesCuadrillas();
        const integrantesFiltrados = integrantesData.data.filter(
          (integrante) => integrante.cuadrilla === parseInt(id)
        );

        // Obtener detalles de los usuarios asociados a los integrantes
        const integrantesConUsuarios = await Promise.all(integrantesFiltrados.map(async (integrante) => {
          const usuario = await getUsuario(integrante.usuario); // Obtener detalles del usuario
          return {
            ...integrante,
            usuario: usuario.data, // Añadir los detalles completos del usuario
          };
        }));

        setIntegrantes(integrantesConUsuarios); // Actualizar el estado de los integrantes con los detalles del usuario
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, [id]);

  // Asignar un nuevo usuario a la cuadrilla
  const handleAgregarMiembro = async (e) => {
    e.preventDefault();

    if (!usuarioSeleccionado) {
      alert("Por favor, seleccione un usuario para asignar.");
      return;
    }

    try {
      await createIntegrantesCuadrillas({
        cuadrilla: id,
        usuario: usuarioSeleccionado
      });

      // Actualizar la lista de integrantes
      const integrantesData = await getAllIntegrantesCuadrillas();
      const integrantesFiltrados = integrantesData.data.filter(
        (integrante) => integrante.cuadrilla === parseInt(id)
      );

      // Obtener detalles de los usuarios asociados a los nuevos integrantes
      const integrantesConUsuarios = await Promise.all(integrantesFiltrados.map(async (integrante) => {
        const usuario = await getUsuario(integrante.usuario); // Obtener detalles del usuario
        return {
          ...integrante,
          usuario: usuario.data, // Añadir los detalles completos del usuario
        };
      }));

      setIntegrantes(integrantesConUsuarios); // Actualizar el estado de los integrantes
      alert("Usuario asignado correctamente.");
      setUsuarioSeleccionado(""); // Limpiar selección
    } catch (error) {
      console.error("Error al asignar usuario:", error);
      alert("Error al asignar usuario.");
    }
  };

  // Eliminar un miembro de la cuadrilla
  const handleEliminarMiembro = async (usuarioId) => {
    try {
      await deleteIntegrantesCuadrillas(usuarioId);

      // Actualizar la lista de integrantes
      const integrantesData = await getAllIntegrantesCuadrillas();
      const integrantesFiltrados = integrantesData.data.filter(
        (integrante) => integrante.cuadrilla === parseInt(id)
      );

      // Obtener detalles de los usuarios asociados a los nuevos integrantes
      const integrantesConUsuarios = await Promise.all(integrantesFiltrados.map(async (integrante) => {
        const usuario = await getUsuario(integrante.usuario); // Obtener detalles del usuario
        return {
          ...integrante,
          usuario: usuario.data, // Añadir los detalles completos del usuario
        };
      }));

      setIntegrantes(integrantesConUsuarios); // Actualizar el estado de los integrantes
      alert("Usuario eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar usuario.");
    }
  };

  return (
    <div>
      <div className="card card-body text black">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Asignar miembros a cuadrilla</h3>
          <button className="btn btn-navegacion" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
        <hr />
        <div>
          <h5>Seleccionar miembro</h5>
          <form onSubmit={handleAgregarMiembro}>
            <div className="form-group">
              <select
                className="form-control"
                id="miembros-select"
                value={usuarioSeleccionado}
                onChange={(e) => setUsuarioSeleccionado(e.target.value)}
              >
                <option value="">Seleccione un usuario</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre} {usuario.apellido}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-navegacion mt-2">Agregar</button>
          </form>
        </div>
      </div>
      <div className="card card-body text black mt-4">
        <h3>Lista de miembros</h3>
        <hr />
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {integrantes.map((integrante) => (
              <tr key={integrante.id}>
                <td>{integrante.usuario.nombre}</td>
                <td>{integrante.usuario.apellido}</td>
                <td>{integrante.usuario.correo}</td>
                <td>
                  <button
                    className="btn btn-navegacion"
                    onClick={() => handleEliminarMiembro(integrante.id)}
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
