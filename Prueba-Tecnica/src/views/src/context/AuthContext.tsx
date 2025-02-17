import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

interface User {
	id: number
	nombre: string
	role: 'admin' | 'trabajador'
	email: string
}

interface AuthContextType {
	isAuthenticated: boolean
	user: User | null
	login: (token: string, user: User) => void
	logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		() => !!localStorage.getItem('token')
	)
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const fetchUser = async () => {
			const token = localStorage.getItem('token')
			if (token) {
				try {
					const response = await api.get('/auth/me')
					const userData = response.data

					// verificamos si el backend devuelve un usuario válido
					if (
						userData &&
						userData.id &&
						userData.email &&
						userData.role &&
						userData.nombre
					) {
						setUser(userData)
					} else {
						console.warn('Los datos del usuario están incompletos:', userData)
						logout()
					}
				} catch (error) {
					console.error('Error al obtener datos del usuario:', error)
					logout()
				}
			}
		}
		fetchUser()
	}, [])

	const login = (token: string, user: User) => {
		localStorage.setItem('token', token)
		setIsAuthenticated(true)
		setUser(user)
	}

	const logout = () => {
		localStorage.removeItem('token')
		setIsAuthenticated(false)
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth debe ser usado dentro de un AuthProvider')
	}
	return context
}
