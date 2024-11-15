import React, { useState } from "react";
import "./iniciar_sesion.css";
import "../../App.css"
import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo_autonoma from "../logo_uautonoma.png";

export default function IniciarSesionRut() {
  const [rut, setRut] = useState("");
  const [clave, setClave] = useState("");

  // Definición de usuarios con roles
  const usuarios = [
    {
      rut: "11111111-1",
      clave: "dire_muni",
      rol: "directorMunicipal",
    },
    {
      rut: "22222222-2",
      clave: "dire_obra",
      rol: "directorObra",
    },
    {
      rut: "33333333-3",
      clave: "gestor",
      rol: "gestorTerritorial",
    },
    {
      rut: "44444444-4",
      clave: "cuadrillas",
      rol: "cuadrillas",
    },
  ];

  const navigate = useNavigate();
  const sesionCorreo = () => navigate('/');

  const handleLogin = (event) => {
    event.preventDefault();
    const usuario = usuarios.find(
      (usuario) => usuario.rut === rut && usuario.clave === clave
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
        <button onClick={sesionCorreo} className="Logout">Iniciar sesion con Correo</button>
      </div>
    <div className="caja">
      <div className="contenido_pequeño">
        <h1>Bienvenido</h1>
        <h3>Inicio de sesión</h3>
        <form onSubmit={handleLogin}>
          <div className="InputUsuario">
            <input
              type="rut"
              placeholder="Rut: XXXXXXXX-X"
              required
              value={rut}
              onChange={(e) => setRut(e.target.value)}
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
