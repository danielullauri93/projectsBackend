import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../index.css';

interface Traslado {
  id: number;
  nombre_trabajador: string;
  direccion_inicio: string;
  direccion_fin: string;
  medio_transporte: string;
  fecha_viaje: string;
  huella_carbono: number;
}

const ListadoTraslados = () => {
  const { user } = useAuth();
  const [traslados, setTraslados] = useState<Traslado[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTraslados = async () => {
      try {
        const response = await api.get('/traslados');
        let trasladosFiltrados = response.data;

        if (user?.role === 'trabajador' && user.nombre) {
          trasladosFiltrados = trasladosFiltrados.filter(
            (traslado: Traslado) =>
              traslado.nombre_trabajador.trim().toLowerCase() ===
              user.nombre.trim().toLowerCase()
          );
        }

        setTraslados(trasladosFiltrados);
      } catch (error) {
        console.error('Error al obtener traslados:', error);
      }
    };

    if (user) {
      fetchTraslados();
    }
  }, [user]);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/traslados/${id}`);
      setTraslados(traslados.filter((traslado) => traslado.id !== id));
      alert('Traslado eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar traslado:', error);
      alert('Error al eliminar traslado');
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/editar-traslado/${id}`);
  };

  const handleDownloadExcel = async () => {
    try {
        const response = await api.get('/api/traslados/descargar-excel', {
            responseType: 'blob', // Indicar que la respuesta es un archivo binario
        });

        // Crear un enlace temporal para descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'traslados.xlsx'); // Nombre del archivo
        document.body.appendChild(link);
        link.click(); // Simular el clic para iniciar la descarga
        document.body.removeChild(link); // Eliminar el enlace temporal
    } catch (error) {
        console.error('Error al descargar el archivo Excel:', error);
        alert('Error al descargar el archivo');
    }
};

  return (
    <div className="centered">
      <div className="list-container">
        <h1>Listado de Traslados</h1>
        <button onClick={handleDownloadExcel}>📥 Descargar Excel</button>
        {traslados.length === 0 ? (
          <p>No hay traslados registrados.</p>
        ) : (
          <ul>
            {traslados.map((traslado) => (
              <li key={traslado.id}>
                <strong>{traslado.nombre_trabajador}</strong> -{' '}
                {traslado.direccion_inicio} a {traslado.direccion_fin}
                <br />
                <small>
                  🚗 <strong>{traslado.medio_transporte}</strong> | 📅 Fecha:{' '}
                  {new Date(traslado.fecha_viaje).toLocaleDateString()}
                  <br />
                  🌿 Huella de carbono:{' '}
                  <strong>{traslado.huella_carbono.toFixed(2)} kg CO₂</strong>
                </small>
                <div>
                  <button onClick={() => handleEdit(traslado.id)}>✏️ Editar</button>
                  <button onClick={() => handleDelete(traslado.id)}>🗑️ Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListadoTraslados;