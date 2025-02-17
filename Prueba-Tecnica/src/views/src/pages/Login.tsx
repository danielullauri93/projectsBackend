import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../index.css'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const { login } = useAuth()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const response = await api.post('/auth/login', { email, password })
			login(response.data.token, response.data.user)
			navigate('/')
		} catch (error) {
			console.error('Error al iniciar sesión:', error)
			setError('Credenciales inválidas')
		}
	}

	return (
		<div className="centered">
			<div className="form-container">
				<h2>Iniciar Sesión</h2>
				{error &&
					<p style={{ color: 'red' }}>
						{error}
					</p>}
				<form onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Contraseña"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<button type="submit">Iniciar Sesión</button>
				</form>
			</div>
		</div>
	)
}

export default Login
