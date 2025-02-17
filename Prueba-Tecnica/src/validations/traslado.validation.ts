import { z } from 'zod' // Importamos la librería Zod para validaciones

// Esquema de validación para los traslados
const trasladoSchema = z.object({
	nombre_trabajador: z.string().min(1, 'El nombre del trabajador es requerido'), // Debe ser una cadena y no puede estar vacía
	direccion_inicio: z.string().min(1, 'La dirección de inicio es requerida'), // Debe ser una cadena y no puede estar vacía
	direccion_fin: z.string().min(1, 'La dirección de fin es requerida'), // Debe ser una cadena y no puede estar vacía
	medio_transporte: z.enum([
		'Metro',
		'Auto (Gasolina)',
		'Camioneta (Diésel)',
		'Motocicleta (Gasolina)',
		'Bus Transantiago',
		'Bus (Privado)',
		'Avión (Nacional)',
		'Avión (Internacional)',
		'Caminando'
	]), // Solo puede ser uno de los valores especificados
	fecha_viaje: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe estar en formato YYYY-MM-DD'), // Debe ser una fecha con el formato YYYY-MM-DD
	kilometros: z.number().min(0, 'Los kilómetros deben ser un número positivo'), // Debe ser un número mayor o igual a 0
	ida_y_vuelta: z.boolean() // Debe ser un valor booleano (true o false)
})

// Función para validar los datos de traslado usando el esquema definido
export const validarTraslado = (data: any) => {
	return trasladoSchema.parse(data) // Si los datos son válidos, los devuelve; si no, lanza un error
}
