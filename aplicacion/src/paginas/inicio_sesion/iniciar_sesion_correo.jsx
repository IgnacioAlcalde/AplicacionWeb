import React, { useState } from "react";
import "./iniciar_sesion.css";
import "../../App.css"
import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo_autonoma from "../logo_uautonoma.png";

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
  const sesionRun = () => navigate('/inicio-sesion-rut');

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
    <div>
      <div className="navbar">
        <img src={logo_autonoma} alt="logo" className='logo_autonoma' />
        <h1>UrbanSenso</h1>
        <button onClick={sesionRun} className="Logout">Iniciar sesion con Rut</button>
      </div>
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
        </form>
        <span
          onClick={() => navigate("/recuperacion_contraseña")}
          className="link"
          style={{ cursor: "pointer" }}
        >
          Olvidé mi contraseña
        </span>
      </div>
    </div>
    </div>
  );
}
