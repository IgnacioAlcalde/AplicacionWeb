import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import '../../componentes.css';
import { createTickets } from '../../api/usuarios.api';
export default function generar_ticket(){

    return (
        <div className="card card-body text-black">
            <h2>Solicitud de soporte</h2>
            <hr/>
            <form className=''>
                <div className="form-group">
                    <label>Motivo</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Descripcion</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Urgencia</label>
                    <select className="form-control">
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Usuario</label>
                    <select className="form-control">
                        <option value="Administrador">Administrador</option>
                        <option value="Departamento">Departamento</option>
                        <option value="Gestor Territorial">Gestor Territorial</option>
                        <option value="Resolutor">Resolutor</option>
                    </select>
                </div>
                <div className='mt-3'>
                    <button type="submit" className="btn btn-navegacion">Enviar</button>
                </div>
            </form>
        </div>
    )
}