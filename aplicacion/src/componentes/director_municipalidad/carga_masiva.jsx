import '../../App.css';
import '../../componentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    const handleImport = async (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('Por favor, selecciona un archivo para importar.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/importar-usuarios/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage(response.data.message);
            setFile(null);
        } catch (error) {
            setMessage(error.response?.data.error || 'Error al importar el archivo.');
        }
    };

    return (
        <div className="card card-body text-black">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="card-title">Importación y Exportación de Usuarios</h2>
                <button className="btn btn-navegacion" onClick={Volver}>Crear usuarios</button>
            </div>
            <div className="row">
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
