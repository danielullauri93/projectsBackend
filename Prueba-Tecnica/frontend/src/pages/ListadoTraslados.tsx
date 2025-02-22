import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

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

        if (user?.role === 'trabajador') {
          trasladosFiltrados = trasladosFiltrados.filter(
            (traslado: Traslado) => traslado.nombre_trabajador === user.nombre
          );
        }
        setTraslados(trasladosFiltrados);
      } catch (error) {
        console.error('Error al obtener traslados:', error);
      }
    };
    fetchTraslados();
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
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'traslados.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el archivo Excel:', error);
      alert('Error al descargar el archivo');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Listado de Traslados</h1>
      <button 
        onClick={handleDownloadExcel} 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        📥 Descargar Excel
      </button>
      {traslados.length === 0 ? (
        <p>No hay traslados registrados.</p>
      ) : (
        <ul className="space-y-4">
          {traslados.map((traslado) => (
            <li key={traslado.id} className="border-b pb-2">
              <strong>{traslado.nombre_trabajador}</strong> - {traslado.direccion_inicio} a {traslado.direccion_fin}
              <br />
              <small>
                🚗 <strong>{traslado.medio_transporte}</strong> | 📅 Fecha:{' '}
                {new Date(traslado.fecha_viaje).toLocaleDateString()}
                <br />
                🌿 Huella de carbono:{' '}
                <strong>{traslado.huella_carbono.toFixed(2)} kg CO₂</strong>
              </small>
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(traslado.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(traslado.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded">
                  🗑️ Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListadoTraslados;
