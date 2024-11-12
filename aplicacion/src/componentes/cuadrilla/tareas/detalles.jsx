import React from 'react'
import '../../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function detalles(){

    return(
        <div>
            <div>
                <h1 className='fs-6 text-black mt-3 ms-3 fw-medium text-start'>listado_incidencias / tareas</h1>
                <button className='btn btn-outline-dark fs-5 fw-bold mb-4 ms-3 px-4 ' onClick={() => window.history.back()}>ATRAS</button>
            </div>
            <div className="container-fluid ">
                <div className='card card-body mb-2'>
                    <div className='d-flex flex-row justify-content-between'>
                        <p className='display-6 text-black mx-5'>Detalles: </p>
                        <h1 className='text-black me-5'>Estado : hola</h1>
                    </div>

                    <h1 className='text-black mt-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem, eaque ullam eius, libero laudantium dolorem officiis obcaecati id laboriosam, amet velit voluptatibus corrupti molestiae numquam eos reprehenderit? Modi, unde consequatur?</h1>
                </div>

                
            </div>
        </div>

    )
}