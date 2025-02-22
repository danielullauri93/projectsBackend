import React, { useState } from 'react'
import api from '../services/api'
import { Traslado } from '../types/trasladoTypes'

const BuscarTraslados = () => {
	const [filtro, setFiltro] = useState('')
	const [traslados, setTraslados] = useState<Traslado[]>([])
	const [loading, setLoading] = useState(false)

	const handleSearch = async () => {
		setLoading(true)
		try {
			const response = await api.get(`/traslados?search=${filtro}`)
			setTraslados(response.data)
		} catch (error) {
			console.error('Error al buscar traslados', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
			<h2 className="text-2xl font-bold mb-4">Buscar Traslados</h2>
			<div className="flex space-x-2 mb-4">
				<input
					type="text"
					placeholder="Buscar por trabajador, fecha o transporte"
					className="border p-2 flex-1 rounded-md"
					value={filtro}
					onChange={e => setFiltro(e.target.value)}
				/>
				<button
					className="bg-blue-600 text-white px-4 py-2 rounded-md"
					onClick={handleSearch}
					disabled={loading}>
					{loading ? 'Buscando...' : 'Buscar'}
				</button>
			</div>

			<ul className="divide-y divide-gray-200">
				{traslados.length === 0
					? <p className="text-gray-500">No se encontraron traslados</p>
					: traslados.map(traslado =>
							<li key={traslado.id} className="py-4">
								<p className="font-semibold">
									{traslado.nombre_trabajador}
								</p>
								<p className="text-sm text-gray-600">
									{traslado.direccion_inicio} → {traslado.direccion_fin} ({traslado.medio_transporte})
								</p>
								<p className="text-sm text-gray-500">
									Fecha: {traslado.fecha_viaje}
								</p>
							</li>
						)}
			</ul>
		</div>
	)
}

export default BuscarTraslados
