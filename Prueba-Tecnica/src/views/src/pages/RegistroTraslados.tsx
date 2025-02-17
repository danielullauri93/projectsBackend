import { useState, useEffect } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import '../index.css'

const RegistroTraslados = () => {
	const { user } = useAuth()

	// Estado inicial del formulario
	const [formData, setFormData] = useState({
		nombre_trabajador: '',
		direccion_inicio: '',
		direccion_fin: '',
		medio_transporte: '',
		fecha_viaje: '',
		kilometros: 0,
		ida_y_vuelta: false
	})

	// Se actualiza el nombre del trabajador cuando el usuario esté disponible
	useEffect(
		() => {
			if (user) {
				setFormData(prevState => ({
					...prevState,
					nombre_trabajador: user.email
				}))
			}
		},
		[user]
	)

	// Validación de permisos
	if (!user || user.role !== 'trabajador') {
		return (
			<h2>
				Acceso denegado. Solo los trabajadores pueden registrar traslados.
			</h2>
		)
	}

	// Manejo de cambios en los inputs
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type, checked } = e.target as HTMLInputElement
		setFormData(prevState => ({
			...prevState,
			[name]: type === 'checkbox' ? checked : value
		}))
	}

	// Manejo del envío del formulario
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const trasladoData = {
			...formData,
			kilometros: parseFloat(formData.kilometros.toString()), // Asegurar número
			fecha_viaje: new Date(formData.fecha_viaje).toISOString().split('T')[0] // Formato YYYY-MM-DD
		}

		try {
			await api.post('/traslados', trasladoData)
			alert('Traslado registrado correctamente')
			setFormData({
				...formData,
				direccion_inicio: '',
				direccion_fin: '',
				medio_transporte: '',
				fecha_viaje: '',
				kilometros: 0,
				ida_y_vuelta: false
			})
		} catch (error) {
			console.error('Error al registrar traslado:', error)
			alert('Error al registrar traslado')
		}
	}

	return (
		<div className="centered">
			<div className="form-container">
				<h2>Registrar Traslado</h2>
				<form onSubmit={handleSubmit}>
					<label>Dirección de Inicio</label>
					<input
						type="text"
						name="direccion_inicio"
						placeholder="Ej: Av. Siempre Viva 123"
						value={formData.direccion_inicio}
						onChange={handleChange}
						required
					/>

					<label>Dirección de Destino</label>
					<input
						type="text"
						name="direccion_fin"
						placeholder="Ej: Calle Falsa 456"
						value={formData.direccion_fin}
						onChange={handleChange}
						required
					/>

					<label>Medio de Transporte</label>
					<select
						name="medio_transporte"
						value={formData.medio_transporte}
						onChange={handleChange}
						required>
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

					<label>Fecha del Viaje</label>
					<input
						type="date"
						name="fecha_viaje"
						value={formData.fecha_viaje}
						onChange={handleChange}
						required
					/>

					<label>Kilómetros de Distancia</label>
					<input
						type="number"
						name="kilometros"
						placeholder="Ej: 15"
						value={formData.kilometros}
						onChange={handleChange}
						required
					/>

					<label>
						<input
							type="checkbox"
							name="ida_y_vuelta"
							checked={formData.ida_y_vuelta}
							onChange={handleChange}
						/>
						Ida y vuelta
					</label>

					<button type="submit">Registrar</button>
				</form>
			</div>
		</div>
	)
}

export default RegistroTraslados
