import React, { useState } from "react";
import "./iniciar_sesion.css";
import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function IniciarSesionCorreo() {
  const [correo, setCorreo] = useState("");

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
    const usuario = usuarios.find((usuario) => usuario.correo === correo);

    if (usuario) {
      alert(
        "Correo enviado, siga las instrucciones en su correo para recuperar la contraseña"
      );
    } else {
      alert("Correo invalido");
    }
  };

  return (
    <div className="caja">
      <div className="contenido_pequeño">
        <h3>Recuperación de contraseña</h3>
        <form onSubmit={handleLogin}>
          <div className="InputUsuario">
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <button type="submit" className="boton_iniciar inicio_sesion">
            Enviar
          </button>
          <br></br>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="boton_iniciar inicio_sesion"
          >
            Volver a inicio de sesión
          </button>
        </form>
      </div>
    </div>
  );
}
