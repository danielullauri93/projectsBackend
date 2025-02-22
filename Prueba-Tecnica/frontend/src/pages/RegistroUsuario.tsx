import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const RegistroUsuario = () => {
	const [formData, setFormData] = useState({
		nombre: '',
		email: '',
		password: '',
		role: 'trabajador' // Por defecto, se asigna el rol "trabajador"
	})
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		try {
			await api.post('/auth/registro', formData)
			alert('Usuario registrado correctamente. Ahora puedes iniciar sesión.')
			navigate('/login')
		} catch (error) {
			console.error('Error al registrar usuario:', error)
			setError('Hubo un problema al registrarse. Inténtalo de nuevo.')
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4 text-center">
					Registro de Usuario
				</h2>
				{error &&
					<p className="text-red-500 text-center">
						{error}
					</p>}
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						name="nombre"
						placeholder="Nombre"
						value={formData.nombre}
						onChange={handleChange}
						required
						className="w-full p-2 border rounded"
					/>

					<input
						type="email"
						name="email"
						placeholder="Correo Electrónico"
						value={formData.email}
						onChange={handleChange}
						required
						className="w-full p-2 border rounded"
					/>

					<input
						type="password"
						name="password"
						placeholder="Contraseña"
						value={formData.password}
						onChange={handleChange}
						required
						className="w-full p-2 border rounded"
					/>

					<select
						name="role"
						value={formData.role}
						onChange={handleChange}
						className="w-full p-2 border rounded">
						<option value="trabajador">Trabajador</option>
						<option value="admin">Administrador</option>
					</select>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
						Registrarse
					</button>
				</form>
			</div>
		</div>
	)
}

export default RegistroUsuario
