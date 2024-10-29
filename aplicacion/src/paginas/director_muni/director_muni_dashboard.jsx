import React from 'react'
import './styles_iniciodirector.css'

function director_muni_dashboard() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light sidebar">
        <a className="navbar-brand" href="#">URBAN SENSO</a>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Inicio</a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        href="../../inicio_sesion_recuperacion/inicioSesionCorreo.html"
                    >
                        Cerrar Sesión
                    </a>
                </li>
            </ul>
        </div>
    </nav>

    <div className="container-fluid">
        <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-3 px-0 bg-light">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="#" className="d-flex align-items-center pb-4 mb-md-0 me-md-auto text-decoration-none">
                        <span className="fs-6 d-none d-sm-inline border text-dark">GESTIÓN DE INCIDENCIAS</span>
                    </a>
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li>
                            <a href="listado_incidencias.html" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Listado de Incidencias</span>
                            </a>
                            <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                <li className="w-100">
                                    <a href="formulario_para_editar.html" className="nav-link px-0">
                                        <span className="d-none d-sm-inline">Editar formato incidencia</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col py-3">
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <h2>DashBoard</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card-md-4">
                                <img src="https://www.pngall.com/wp-content/uploads/12/Graph-PNG-Image-File.png" className="card-img-top" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">Servicio 2</h5>
                                    <p className="card-text">Uso de la Plataforma de Reportes</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card-md-4">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/03/Premios_Caleuche_2019_-_2019-01-22_-_05.jpg" className="card-img-top" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">Servicio 2</h5>
                                    <p className="card-text">Empleado del Mes: Gestión Eficiente de Incidencias</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</div>

  )
}

export default director_muni_dashboard