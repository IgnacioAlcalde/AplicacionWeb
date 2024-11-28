import React, { useState } from "react";
import "./iniciar_sesion.css";
import "../../App.css";
import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo_autonoma from "../logo_uautonoma.png";
import axios from "axios";

export default function IniciarSesionRut() {
  const [run, setRut] = useState("");
  const [contraseña, setContraseña] = useState("");

  const navigate = useNavigate();
  const sesionCorreo = () => navigate("/");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        {
          run,
          contraseña,
        }
      );

      const { success, rol, token } = response.data;

      if (success) {
        // Almacenar el token en el localStorage
        localStorage.setItem("authToken", token);

        // Redirigir según el rol del usuario
        switch (rol) {
          case "Administrador":
            navigate("/director-municipalidad/inicio");
            break;
          case "Director municipalidad":
            navigate("/director-municipalidad/inicio");
            break;
          case "Director de obras":
            navigate("/director-obra/inicio");
            break;
          case "Gestor territorial":
            navigate("/gestor-territorial/inicio");
            break;
          case "Cuadrilla":
            navigate("/cuadrilla/inicio");
            break;
          default:
            navigate("/cuadrilla/inicio");
            break;
        }
      } else {
        setError("Credenciales inválidas.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div>
      <div className="navbar">
        <img src={logo_autonoma} alt="logo" className="logo_autonoma" />
        <h1>Urban Sensor</h1>
        <button onClick={sesionCorreo} className="Logout">
          Iniciar sesion con Correo
        </button>
      </div>
      <div className="caja">
        <div className="contenido_pequeño">
          <h1>Bienvenido</h1>
          <h3>Inicio de sesión</h3>
          <form onSubmit={handleLogin}>
            <div className="InputUsuario">
              <input
                type="run"
                placeholder="Run: XXXXXXXX-X"
                required
                value={run}
                onChange={(e) => setRut(e.target.value)}
              />
              <FaUser className="iconousuario" />
            </div>
            <div className="InputUsuario">
              <input
                type="password"
                placeholder="Contraseña"
                required
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
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
