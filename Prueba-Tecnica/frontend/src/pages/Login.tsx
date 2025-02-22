import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const Login = () => {
	const navigate = useNavigate()
	const { login } = useAuth()

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	const [error, setError] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		try {
			const response = await api.post('/auth/login', formData)
			login(response.data.user, response.data.token)
			navigate('/')
		} catch (error) {
			console.error('Error al iniciar sesión:', error)
			setError('Credenciales inválidas')
		}
	}

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-semibold text-center mb-4">
				Iniciar Sesión
			</h2>

			{error &&
				<p className="text-red-600 text-center">
					{error}
				</p>}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
						className="w-full mt-1 p-2 border rounded-md"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Contraseña
					</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
						className="w-full mt-1 p-2 border rounded-md"
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
					Iniciar Sesión
				</button>
			</form>
		</div>
	)
}

export default Login
