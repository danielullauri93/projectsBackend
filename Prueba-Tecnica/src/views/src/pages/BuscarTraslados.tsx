import { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../index.css';

const BuscarTraslados = () => {
  const { user } = useAuth();
  const [nombre, setNombre] = useState('');
  const [direccionInicio, setDireccionInicio] = useState('');
  const [direccionFin, setDireccionFin] = useState('');
  const [resultados, setResultados] = useState<
    {
      id: number;
      nombre_trabajador: string;
      direccion_inicio: string;
      direccion_fin: string;
      medio_transporte: string;
      fecha_viaje: string;
    }[]
  >([]);

  if (!user || user.role !== 'admin') {
    return <h2>Acceso denegado. Solo los administradores pueden buscar traslados.</h2>;
  }

  const handleSearch = async () => {
    try {
      const response = await api.get('/traslados');
      let trasladosFiltrados = response.data;

      // Convertir valores a minúsculas para búsqueda no sensible a mayúsculas
      const nombreFiltro = nombre.trim().toLowerCase();
      const inicioFiltro = direccionInicio.trim().toLowerCase();
      const finFiltro = direccionFin.trim().toLowerCase();

      trasladosFiltrados = trasladosFiltrados.filter((traslado: {
        id: number;
        nombre_trabajador: string;
        direccion_inicio: string;
        direccion_fin: string;
        medio_transporte: string;
        fecha_viaje: string;
      }) => {
        const nombreMatch = nombreFiltro
          ? traslado.nombre_trabajador.toLowerCase().includes(nombreFiltro)
          : true;
        const inicioMatch = inicioFiltro
          ? traslado.direccion_inicio.toLowerCase().includes(inicioFiltro)
          : true;
        const finMatch = finFiltro
          ? traslado.direccion_fin.toLowerCase().includes(finFiltro)
          : true;

        return nombreMatch && inicioMatch && finMatch;
      });

      setResultados(trasladosFiltrados);
    } catch (error) {
      console.error('Error al buscar traslados:', error);
      alert('Error al buscar traslados');
    }
  };

  return (
    <div className="centered">
      <div className="list-container">
        <h1>Buscar Traslados</h1>

        <input
          type="text"
          placeholder="Nombre del trabajador"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Dirección de inicio"
          value={direccionInicio}
          onChange={(e) => setDireccionInicio(e.target.value)}
        />

        <input
          type="text"
          placeholder="Dirección de destino"
          value={direccionFin}
          onChange={(e) => setDireccionFin(e.target.value)}
        />

        <button onClick={handleSearch}>Buscar</button>

        {resultados.length === 0 ? (
          <p>No se encontraron traslados.</p>
        ) : (
          <ul>
            {resultados.map((traslado) => (
              <li key={traslado.id}>
                <strong>{traslado.nombre_trabajador}</strong> - {traslado.direccion_inicio} a{' '}
                {traslado.direccion_fin} <br />
                <small>
                  🚗 {traslado.medio_transporte} | 📅 {new Date(traslado.fecha_viaje).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BuscarTraslados;
