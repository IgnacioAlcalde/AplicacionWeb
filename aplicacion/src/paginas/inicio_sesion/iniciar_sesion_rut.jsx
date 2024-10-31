import React, { useState } from 'react';
import './iniciar_sesion.css';
import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function IniciarSesionRut() {
    const [rut, setRut] = useState('');
    const [clave, setClave] = useState('');

    // Definición de usuarios con roles
    const usuarios = [
        {
            rut: '11111111-1',
            clave: 'dire_muni',
            rol: 'directorMunicipal'
        },
        {
            correo: '22222222-2',
            clave: 'dire_obra',
            rol: 'directorObra'
        },
        {
            correo: '33333333-3',
            clave: 'gestor',
            rol: 'gestorTerritorial'
        },
        {
            correo: '44444444-4',
            clave: 'cuadrillas',
            rol: 'cuadrillas'
        }
    ];

    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        const usuario = usuarios.find(usuario => usuario.rut === rut && usuario.clave === clave);

        if (usuario) {
            localStorage.setItem('rol', usuario.rol);
            switch (usuario.rol) {
                case 'directorMunicipal':
                    navigate('/director-municipalidad/inicio');
                    break;
                case 'directorObra':
                    navigate('/director-obra/inicio');
                    break;
                case 'gestorTerritorial':
                    navigate('/gestor-territorial/inicio');
                    break;
                case 'cuadrillas':
                    navigate('/cuadrilla/inicio');
                    break;
                default:
                    break;
            }
        } else {
            alert('Credenciales Invalidas');
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
                            type="rut"
                            placeholder="Rut: XXXXXXXX-X"
                            required
                            value={rut}
                            onChange={(e) => setRut(e.target.value)}
                        />
                        <FaUser className='iconousuario' />
                    </div>
                    <div className="InputUsuario">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            required
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                        />
                        <MdOutlinePassword className='iconocontra' />
                    </div>
                    <button type="submit" className="boton_iniciar inicio_sesion">Iniciar sesión</button>
                    <center>
                    <span onClick={() => navigate('/')} className="rut_mensaje" style={{ cursor: 'pointer' }}>
                     Ingresar con correo
                    </span>
                    </center>
                </form>
                <a href="olvide_contraseña.html" className="olv">Olvidé mi contraseña</a>
            </div>
        </div>
    );
}
