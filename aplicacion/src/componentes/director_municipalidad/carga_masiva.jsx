import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../inicio.css';
import '../../componentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CargaMasiva() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const Volver = () => navigate('/director-municipalidad/crear-usuarios');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
                setFile(selectedFile);
                setMessage('Archivo listo para importar: ' + selectedFile.name);
            } else {
                setMessage('Por favor, selecciona un archivo CSV válido.');
                setFile(null);
            }
        }
    };

    const handleImport = (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('Por favor, selecciona un archivo para importar.');
            return;
        }

        // Aquí podrías añadir la lógica para leer y procesar el archivo CSV
        // Por ejemplo, utilizando FileReader o una librería como papaparse

        // Mensaje de éxito (esto es solo un ejemplo)
        setMessage('Archivo importado exitosamente.');
        setFile(null);
    };

    return (
        <div className="card card-body text-black">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="card-title">Importación y Exportación de Usuarios</h2>
                <button className="btn btn-navegacion" onClick={Volver}>Crear usuarios</button>
            </div>
            <div className="row">
                {/* Formulario para importar usuarios */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Importar Usuarios</div>
                        <div className="card-body">
                            <form onSubmit={handleImport}>
                                <div className="form-group">
                                    <label htmlFor="fileInput">Subir archivo CSV </label>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        id="fileInput"
                                        accept=".csv"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success">Importar</button>
                                {message && <div className="mt-2 alert alert-info">{message}</div>}
                            </form>
                        </div>
                    </div>
                </div>
                {/* Botón para exportar usuarios */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Exportar Usuarios</div>
                        <div className="card-body">
                            <button type="button" className="btn btn-success">Descargar Lista de Usuarios</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
