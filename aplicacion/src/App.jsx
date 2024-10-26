import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IniciarSesion from './paginas/inicio_sesion/iniciar_sesion.jsx'
function Aplicacion() {
    return (
      <div className='Aplicacion'>
        <Router>
          <Routes>
            <Route path="/" element={<IniciarSesion/>} />
          </Routes>
        </Router>
      </div>
    )
  }
  export default Aplicacion
  