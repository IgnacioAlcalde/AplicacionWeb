import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllIncidencias, updateIncidencias } from '../../api/usuarios.api';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function editar_incidencia() {
    const { id } = useParams(); // Obtiene el ID de la incidencia desde la URL
    const navigate = useNavigate(); // Para redirigir después de la edición
    const [incidencia, setIncidencia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Cargar la incidencia desde el backend
        const fetchIncidencia = async () => {
            try {
                const res = await getAllIncidencias();
                const data = res.data.find((item) => item.id === parseInt(id));
                if (data) {
                    setIncidencia(data);
                } else {
                    setError('Incidencia no encontrada');
                }
            } catch (err) {
                setError('Error al cargar la incidencia');
            } finally {
                setLoading(false);
            }
        };
        fetchIncidencia();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncidencia((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateIncidencias(id, incidencia);
            alert('Incidencia actualizada exitosamente');
            navigate('/director-obra/listado-incidencias'); // Redirige al listado de incidencias
        } catch (err) {
            setError('Error al actualizar la incidencia');
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="card card-body text-black">
            <div className="d-flex justify-content-between align-items-start mb-3">
                <h2 className="tituloh2">Editar Incidencia</h2>
                <button className="btn btn-navegacion" onClick={() => navigate(-1)}>Cancelar</button>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={incidencia.titulo || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={incidencia.descripcion || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="localizacion">Localización</label>
                    <input
                        type="text"
                        id="localizacion"
                        name="localizacion"
                        value={incidencia.localizacion || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fecha">Fecha</label>
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={incidencia.fecha || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imagenes">Imágenes</label>
                    <input
                        type="file"
                        id="imagenes"
                        name="imagenes"
                        className="form-control"
                        onChange={(e) => setIncidencia((prev) => ({ ...prev, imagenes: e.target.files[0] }))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="estado">Estado</label>
                    <select
                        id="estado"
                        name="estado"
                        value={incidencia.estado || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Seleccione un estado</option>
                        <option value="Sin iniciar">Sin iniciar</option>
                        <option value="En progreso">En progreso</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Abandonado">Abandonado</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-navegacion mt-3">Guardar Cambios</button>
            </form>
        </div>
    );
}
