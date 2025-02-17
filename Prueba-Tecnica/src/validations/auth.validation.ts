import { z } from 'zod' // Importamos la librería Zod para validar datos

// Esquema de validación para el registro de usuarios
const registroSchema = z.object({
	nombre: z.string().min(1, 'El nombre es requerido'), // Debe ser una cadena y no puede estar vacío
	email: z.string().email('El email no es válido'), // Debe ser un email válido
	password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'), // Debe tener mínimo 6 caracteres
	role: z.enum(['admin', 'trabajador']).optional() // El rol puede ser 'admin' o 'trabajador', pero es opcional
})

// Esquema de validación para el inicio de sesión
const loginSchema = z.object({
	email: z.string().email('El email no es válido'), // Debe ser un email válido
	password: z.string().min(1, 'La contraseña es requerida') // Debe ser una cadena y no puede estar vacía
})

// Función para validar los datos de registro usando el esquema definido
export const validarRegistro = (data: any) => {
	return registroSchema.parse(data) // Si los datos son válidos, los devuelve; si no, lanza un error
}

// Función para validar los datos de login usando el esquema definido
export const validarLogin = (data: any) => {
	return loginSchema.parse(data) // Si los datos son válidos, los devuelve; si no, lanza un error
}
