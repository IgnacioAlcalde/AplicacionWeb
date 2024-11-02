import React from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function tareas(){
    const navigate = useNavigate();

    const handleTareasClick = () => {
        navigate('/cuadrilla/detalles');
    };

    return(
        <div>
            <div>
                <h1 className='fs-6 text-black mt-3 ms-3 fw-medium text-start'>listado_incidencias /</h1>
                <button className='btn btn-outline-dark fs-5 fw-bold mb-4 ms-3 px-4 ' onClick={() => window.history.back()}>ATRAS</button>
            </div>
            <div className="container-fluid ">
                <div className='card card-body  d-flex flex-row justify-content-between mb-2 '>
                    <p className='display-6 text-black mx-5'>Tarea 1  </p>

                    <p className='display-6 text-black mx-5'>Estado:  </p>
                    <div>
                        <button className='btn btn-success fs-3 me-3' >Subir evidencia</button>
                        <button className='btn btn-success fs-3 me-3' onClick={handleTareasClick}>Detalles</button>
                    </div>
                </div>
            </div>
        </div>

    )
}