<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Página de Servicios</title>
  {/* Enlace a Bootstrap CSS */}
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  {/* Enlace a tu archivo CSS externo */}
  <link rel="stylesheet" href="inicioSesionCorreo.css" />
  <header>
    <nav className="navbar navbar-expand-lg navbar-light sidebar">
      <a className="navbar-brand" href="#">
        URBAN SENSO
      </a>
    </nav>
  </header>
  <div className="caja">
    <div className="contenido_pequeño">
      <h3>Inicio de sesión</h3>
      <form
        id="formulario_iniciar"
        method="post"
        action="#"
        onsubmit="iniciarsesion(event)"
      >
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="nombre@ejemplo.com"
          required=""
        />
        <p className="mensaje">Correo o contraseña ingresada no es correcto</p>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="clave"
          placeholder="Contraseña"
        />
        {/* <a href="../inicioadmin_dashboard.html" class="inicio_sesion">Iniciar sesión</a> */}
        <button type="submit" className="boton_iniciar inicio_sesion">
          Iniciar sesión
        </button>
        <center>
          <a href="inicioSesionRut.html" className="rut_mensaje">
            Ingresar con rut
          </a>
        </center>
      </form>
      <a href="olvide_contraseña.html" className="olv">
        Olvide mi contraseña
      </a>
    </div>
  </div>
</>
