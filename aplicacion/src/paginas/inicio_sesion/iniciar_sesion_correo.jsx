import React, { useState } from "react";
import "./iniciar_sesion.css";
import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function IniciarSesionCorreo() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  // Definición de usuarios con roles
  const usuarios = [
    {
      correo: "dire_muni@correo.com",
      clave: "dire_muni",
      rol: "directorMunicipal",
    },
    {
      correo: "dire_obra@correo.com",
      clave: "dire_obra",
      rol: "directorObra",
    },
    {
      correo: "gestor@correo.com",
      clave: "gestor",
      rol: "gestorTerritorial",
    },
    {
      correo: "cuadrillas@correo.com",
      clave: "cuadrillas",
      rol: "cuadrillas",
    },
  ];

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const usuario = usuarios.find(
      (usuario) => usuario.correo === correo && usuario.clave === clave
    );

    if (usuario) {
      localStorage.setItem("rol", usuario.rol);
      switch (usuario.rol) {
        case "directorMunicipal":
          navigate("/director-municipalidad/inicio");
          break;
        case "directorObra":
          navigate("/director-obra/inicio");
          break;
        case "gestorTerritorial":
          navigate("/gestor-territorial/inicio");
          break;
        case "cuadrillas":
          navigate("/cuadrilla/inicio");
          break;
        default:
          break;
      }
    } else {
      alert("Credenciales Invalidas");
    }
  };

  return (
    <div className="caja">
      <div className="contenido_pequeño">
        <h1>Bienvenido</h1>
        <h3>Inicio de sesión</h3>
        <form onSubmit={handleLogin}>
          <div className="InputUsuario">
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <FaUser className="iconousuario" />
          </div>
          <div className="InputUsuario">
            <input
              type="password"
              placeholder="Contraseña"
              required
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
            <MdOutlinePassword className="iconocontra" />
          </div>
          <button type="submit" className="boton_iniciar inicio_sesion">
            Iniciar sesión
          </button>
          <center>
            <span
              onClick={() => navigate("/inicio_sesion_rut")}
              className="link"
              style={{ cursor: "pointer" }}
            >
              Ingresar con rut
            </span>
          </center>
        </form>
        <br></br>
        <span
          onClick={() => navigate("/recuperacion_contraseña")}
          className="link"
          style={{ cursor: "pointer" }}
        >
          Olvide mi contraseña
        </span>
      </div>
    </div>
  );
}
