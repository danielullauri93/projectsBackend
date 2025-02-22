import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

const EditarTraslado = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		nombre_trabajador: '',
		direccion_inicio: '',
		direccion_fin: '',
		medio_transporte: '',
		fecha_viaje: '',
		kilometros: 0,
		ida_y_vuelta: false
	})

	useEffect(
		() => {
			const fetchTraslado = async () => {
				try {
					const response = await api.get(`/traslados/${id}`)
					const traslado = response.data

					setFormData({
						nombre_trabajador: traslado.nombre_trabajador,
						direccion_inicio: traslado.direccion_inicio,
						direccion_fin: traslado.direccion_fin,
						medio_transporte: traslado.medio_transporte,
						fecha_viaje: traslado.fecha_viaje,
						kilometros: traslado.kilometros,
						ida_y_vuelta: traslado.ida_y_vuelta
					})
				} catch (error) {
					console.error('Error al obtener traslado:', error)
				}
			}

			if (id) fetchTraslado()
		},
		[id]
	)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type, checked } = e.target as HTMLInputElement
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await api.put(`/traslados/${id}`, formData)
			alert('Traslado actualizado correctamente')
			navigate('/traslados')
		} catch (error) {
			console.error('Error al actualizar traslado:', error)
			alert('Error al actualizar traslado')
		}
	}

	return (
		<div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-semibold text-center mb-4">
				Editar Traslado
			</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Nombre del Trabajador
					</label>
					<input
						type="text"
						name="nombre_trabajador"
						value={formData.nombre_trabajador}
						onChange={handleChange}
						required
						className="w-full mt-1 p-2 border rounded-md"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Dirección de Inicio
					</label>
					<input
						type="text"
						name="direccion_inicio"
						value={formData.direccion_inicio}
						onChange={handleChange}
						required
						className="w-full mt-1 p-2 border rounded-md"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Dirección de Destino
					</label>
					<input
						type="text"
						name="direccion_fin"
						value={formData.direccion_fin}
						onChange={handleChange}
						required
						className="w-full mt-1 p-2 border rounded-md"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Medio de Transporte
					</label>
					<select
						name="medio_transporte"
						value={formData.medio_transporte}
						onChange={handleChange}
						required
						className="w-full mt-1 p-2 border rounded-md">
						<option value="">Selecciona un medio de transporte</option>
						<option value="Metro">Metro</option>
						<option value="Auto (Gasolina)">Auto (Gasolina)</option>
						<option value="Camioneta (Diésel)">Camioneta (Diésel)</option>
						<option value="Motocicleta (Gasolina)">
							Motocicleta (Gasolina)
						</option>
						<option value="Bus Transantiago">Bus Transantiago</option>
						<option value="Bus (Privado)">Bus (Privado)</option>
						<option value="Avión (Nacional)">Avión (Nacional)</option>
						<option value="Avión (Internacional)">Avión (Internacional)</option>
						<option value="Caminando">Caminando</option>
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Fecha del Viaje
					</label>
					<input
						type="date"
						name="fecha_viaje"
						value={formData.fecha_viaje}
						onChange={handleChange}
						required
						className="w-full mt-1 p-2 border rounded-md"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Kilómetros de Distancia
					</label>
					<input
						type="number"
						name="kilometros"
						value={formData.kilometros}
						onChange={handleChange}
						required
						className="w-full mt-1 p-2 border rounded-md"
					/>
				</div>

				<div className="flex items-center">
					<input
						type="checkbox"
						name="ida_y_vuelta"
						checked={formData.ida_y_vuelta}
						onChange={handleChange}
						className="mr-2"
					/>
					<label className="text-sm font-medium text-gray-700">
						Ida y vuelta
					</label>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
					Guardar Cambios
				</button>
			</form>
		</div>
	)
}

export default EditarTraslado
