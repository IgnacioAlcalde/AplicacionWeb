import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IniciarSesion from './paginas/inicio_sesion/iniciar_sesion.jsx'
import Director_Muni_Dashboard from './paginas/director_muni/director_muni_dashboard.jsx';

function Aplicacion() {
    return (
      <div className='Aplicacion'>
        <Router>
          <Routes>
            <Route path="/" element={<IniciarSesion/>} />
            <Route path='director_muni_dashboard' element={<Director_Muni_Dashboard/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
  export default Aplicacion
  