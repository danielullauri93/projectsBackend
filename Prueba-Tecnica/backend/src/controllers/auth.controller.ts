import { Request, Response } from 'express'
import { db } from '../config/database'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validarRegistro, validarLogin } from '../validations/auth.validation'
import { AuthRequest, AuthUser } from '../types/authTypes' // Importar tipado de autenticación

/**
 * Controlador para registrar un usuario.
 */
export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
	try {
		// Validamos los datos del usuario
		const datosUsuario = validarRegistro(req.body)

		// Verificamos si el usuario ya existe
		const [usuarioExistente]: any[] = await db.query(
			'SELECT * FROM usuarios WHERE email = ?',
			[datosUsuario.email]
		)

		if (usuarioExistente.length > 0) {
			res.status(400).json({ mensaje: 'El usuario ya existe' })
			return
		}

		// Hashear la contraseña antes de guardarla
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(datosUsuario.password, salt)

		// Insertar el usuario en la base de datos
		await db.query(
			'INSERT INTO usuarios (nombre, email, password, role) VALUES (?, ?, ?, ?)',
			[
				datosUsuario.nombre,
				datosUsuario.email,
				hashedPassword,
				datosUsuario.role || 'trabajador'
			]
		)

		res.status(201).json({ mensaje: 'Usuario registrado correctamente' })
	} catch (error) {
		console.error('Error al registrar usuario:', error)
		res.status(500).json({ mensaje: 'Error al registrar usuario' })
	}
}

/**
 * Controlador para iniciar sesión.
 */
export const iniciarSesion = async (req: Request, res: Response): Promise<void> => {
	try {
		// Validar datos de login
		const datosLogin = validarLogin(req.body)

		// Buscar el usuario en la base de datos
		const [usuario]: any[] = await db.query('SELECT * FROM usuarios WHERE email = ?', [
			datosLogin.email
		])

		if (usuario.length === 0) {
			res.status(400).json({ mensaje: 'Credenciales inválidas' })
			return
		}

		const usuarioEncontrado = usuario[0]

		// Verificar la contraseña
		const contraseñaValida = await bcrypt.compare(datosLogin.password, usuarioEncontrado.password)

		if (!contraseñaValida) {
			res.status(400).json({ mensaje: 'Credenciales inválidas' })
			return
		}

		// Generar token JWT
		const token = jwt.sign(
			{ id: usuarioEncontrado.id, role: usuarioEncontrado.role } as AuthUser, // ✅ Aplicar tipo
			process.env.JWT_SECRET as string,
			{ expiresIn: '1h' }
		)

		res.status(200).json({
			token,
			user: {
				id: usuarioEncontrado.id,
				email: usuarioEncontrado.email,
				role: usuarioEncontrado.role
			}
		})
	} catch (error) {
		console.error('Error al iniciar sesión:', error)
		res.status(500).json({ mensaje: 'Error al iniciar sesión' })
	}
}

/**
 * Controlador para obtener el usuario autenticado.
 */
export const obtenerUsuarioAutenticado = async (req: AuthRequest, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id

		const [usuarios]: any[] = await db.query(
			'SELECT id, nombre, email, role FROM usuarios WHERE id = ?',
			[userId]
		)

		if (usuarios.length === 0) {
			res.status(404).json({ mensaje: 'Usuario no encontrado' })
			return
		}

		res.json(usuarios[0])
	} catch (error) {
		console.error('Error al obtener usuario:', error)
		res.status(500).json({ mensaje: 'Error al obtener usuario' })
	}
}
