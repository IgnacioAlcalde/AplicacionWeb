import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import '../../inicio.css';
import '../../componentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CrearUsuarios() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("Director de obras");
  const [estado, setEstado] = useState("Activo");

  // Función para limpiar el formulario
  const handleClear = () => {
    setNombre("");
    setApellido("");
    setCorreo("");
    setRol("Director de obras");
    setEstado("Activo");
    alert("Formulario limpio");  // Mensaje de confirmación para verificar el vaciado
  };
  const handleSave = () => {
    console.log("Usuario guardado");
  };
  const navigate = useNavigate();
  const navegarInicio = () => navigate('/director-municipalidad/inicio');
  const navegarCargaMasiva = () => navigate('/director-municipalidad/carga-masiva');
  return (
        <div className="card card-body text-black">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="card-title">Creación de usuarios</h2>
            <button className="btn btn-navegacion" onClick={navegarCargaMasiva}>Carga masiva</button>
            </div>

          <form>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Ingresa el nombre del usuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                placeholder="Ingresa el apellido del usuario"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="correo">Correo:</label>
              <input
                type="email"
                className="form-control"
                id="correo"
                placeholder="Ingresa el correo del usuario"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rol">Rol:</label>
              <select
                className="form-control"
                id="rol"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              >
                <option>Director de obras</option>
                <option>Resolutor</option>
                <option>Gestor territorial</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="estado">Estado:</label>
              <select
                className="form-control"
                id="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar usuario</button>
              <button type="button" className="btn btn-secondary mx-2" onClick={handleClear}>Limpiar</button>
              <button type="button" className="btn btn-danger" onClick={navegarInicio}>Cancelar</button>
            </div>
          </form>
        </div>
  );
}
