import React from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Incidencias(){

    const navigate = useNavigate();

    const handleTareasClick = () => {
        navigate('/cuadrilla/tareas');
    };

    return(
        <div className="container-fluid ">
            <div className='card card-body  d-flex flex-row justify-content-between mb-2'>
                <p className='display-6 text-black mx-5'>Incidencia 1  </p>
                <div>
                    <button className='btn btn-success fs-3 me-3' onClick={handleTareasClick}>Tareas asignadas</button>
                </div>
            </div>
        </div>
    )
}

