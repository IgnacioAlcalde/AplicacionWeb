import '../../componentes.css';
import 'leaflet/dist/leaflet.css'; // Estilos de Leaflet
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Mapa} from '../general/dashboard/mapa';
import { EstadoIncidencias } from '../general/dashboard/estado_incidencias';
import {EstadoTickets} from '../general/dashboard/estado_tickets';
import {IncidenciasPorTipo} from '../general/dashboard/tipos_incidencias';

export default function () {
  return (
    <div className="text-black">
      <div className="d-flex justify-content-between align-items-start mb-3">
        {/*Mapa */}
        <div className="tarjeta flex-grow-1 shadow-sm" style={{ minWidth: '30%' }}>
          <div className="Mapa mx-2 py-3">
            <Mapa />
          </div>
        </div>
        {/* Grafico donut */}
        <div className="tarjeta mx-3 shadow-sm" style={{ minWidth: '25%' }}>
          <div className='fondo text-white'>
            <h3 className='mx-3'>Estado incidencias</h3>
          </div>
          <div className="Donut py-3 px-2">
            <EstadoIncidencias />
          </div>
        </div>
        {/* Tarjeta vacía (puedes añadir más contenido aquí) */}
        <div className="tarjeta shadow-sm" style={{ minWidth: '25%' }}>
          <div className='fondo text-white'>
            <h3 className='mx-3'>Estado tickets</h3>
          </div>
          <div className=" Donut py-3 px-2">
            <EstadoTickets />
          </div>
        </div>
      </div>
  
      {/* Fila adicional de contenido si se necesita */}
      <div className="d-flex justify-content-between align-items-start">
        {/*Fecha incidencias */}
        <div className="tarjeta flex-grow-1 shadow-sm" style={{ minWidth: '30%' }}>
          <div className='fondo text-white'>
            <h3 className='mx-3'>Tipo de incidencias</h3>
          </div>
          <div className="Barras mx-2 py-3">
            <IncidenciasPorTipo />
          </div>
        </div>
        <div className="tarjeta flex-grow-1 shadow-sm mx-2" style={{ minWidth: '30%' }}>
          <div className=" mx-2 py-3">
            {/*Acá va otra cosa */}
          </div>
        </div>
        <div className="tarjeta flex-grow-1 shadow-sm" style={{ minWidth: '30%' }}>
          <div className=" mx-2 py-3">
            {/*Acá va otra cosa */}
          </div>
        </div>
      </div>
      
      <footer className="footer">
        <p>¿Necesitas ayuda? Contáctanos en: <br />
           <strong>Correo:</strong> soporte_urban@gmail.com <br />
           <strong>Teléfono:</strong> +56 2 2314 8900
        </p>
      </footer>
    </div>
  );
}