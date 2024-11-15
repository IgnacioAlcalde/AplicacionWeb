import React, {useState} from 'react'
import '../../App.css';
import '../../componentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AsignacionCuadrilla() {
  const [cuadrilla, setCuadrilla] = useState('');
  const [incidencia, setIncidencia] = useState('');
  const [tablaVisible, setTablaVisible] = useState(false);

  const handleCuadrillaChange = (event) => {
    setCuadrilla(event.target.value);
  };

  const handleIncidenciaChange = (event) => {
    setIncidencia(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nuevaFila = {
      cuadrilla,
      incidencia,
    };
    setTablaVisible(true); // Muestra la tabla temporalmente
    setCuadrilla('');
    setIncidencia('');
  };
  const navegarInicio = () => navigate('/gestor-territorial/inicio');
  return (
    <div className="container">
      <button className="boton-retroceder" onClick={navegarInicio}></button>
      <h1 className="letras-container">Asignación de Cuadrilla</h1>
      <p className="parrafo-cuadrilla">Selecciona la cuadrilla que deseas asignar</p>
      <form id="asignar-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="texto-cuadrilla" htmlFor="cuadrilla-select">
            Cuadrilla
          </label>
          <select className="form-control" id="cuadrilla-select" value={cuadrilla} onChange={handleCuadrillaChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="form-group">
          <label className="texto-incidencia" htmlFor="incidencia-select">
            Incidencia
          </label>
          <select className="form-control" id="incidencia-select" value={incidencia} onChange={handleIncidenciaChange}>
            <option value="Accidente">Accidente</option>
            <option value="Árbol Caído">Árbol Caído</option>
            <option value="Semáforo">Semáforo</option>
            <option value="Robo">Robo</option>
          </select>
        </div>

        <button type="submit" className="boton-asignar">
          Asignar
        </button>
      </form>

      {tablaVisible && (
        <table id="cuadrilla-table">
          <thead>
            <tr>
              <th className="cuadrilla-th">Cuadrilla-</th>
              <th className="incidencia-th">Incidencia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="cuadrilla-td">{cuadrilla}</td>
              <td className="incidencia-td">{incidencia}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}