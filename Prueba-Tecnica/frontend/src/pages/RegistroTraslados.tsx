import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const RegistroTraslados = () => {
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
			await api.post('/traslados', formData)
			alert('Traslado registrado correctamente')
			navigate('/traslados')
		} catch (error) {
			console.error('Error al registrar traslado:', error)
			alert('Error al registrar traslado')
		}
	}

	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="bg-white p-8 rounded-lg shadow-lg w-96">
				<h2 className="text-xl font-semibold mb-4">Registrar Traslado</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						name="nombre_trabajador"
						placeholder="Nombre del Trabajador"
						value={formData.nombre_trabajador}
						onChange={handleChange}
						required
						className="w-full p-2 border rounded"
					/>
					<input
						type="text"
						name="direccion_inicio"
						placeholder="Dirección de Inicio"
						value={formData.direccion_inicio}
						onChange={handleChange}
						required
						className="w-full p-2 border rounded"
					/>
					<input
						type="text"
						name="direccion_fin"
						placeholder="Dirección de Destino"
						value={formData.direccion_fin}
						onChange={handleChange}
						required
						className="w-full p-2 border rounded"
					/>
					<select
						name="medio_transporte"
						value={formData.medio_transporte}
						onChange={handleChange}
						required
						className="w-full p-2 border rounded">
						<option value="">Selecciona un medio de transporte</option>
						<option value="Metro">Metro</option>
						<option value="Auto (Gasolina)">Auto (Gasolina)</option>
						<option value="Camioneta (Diésel)">Camioneta (Diésel)</option>
						<option value="Motocicleta (Gasolina)">
							Motocicleta (Gasolina)
						</option>
						<option value="Bus">Bus</option>
					</select>
					<input
						type="date"
						name="fecha_viaje"
						value={formData.fecha_viaje}
						onChange={handleChange}
						required
						className="w-full p-2 border rounded"
					/>
					<input
						type="number"
						name="kilometros"
						placeholder="Kilómetros"
						value={formData.kilometros}
						onChange={handleChange}
						required
						className="w-full p-2 border rounded"
					/>
					<label className="flex items-center">
						<input
							type="checkbox"
							name="ida_y_vuelta"
							checked={formData.ida_y_vuelta}
							onChange={handleChange}
							className="mr-2"
						/>
						Ida y vuelta
					</label>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded">
						Registrar
					</button>
				</form>
			</div>
		</div>
	)
}

export default RegistroTraslados
