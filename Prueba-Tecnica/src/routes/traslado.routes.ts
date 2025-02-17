import express, { Request, Response } from 'express'
import {
	crearTraslado,
	obtenerTraslados,
	obtenerTrasladoPorId,
	actualizarTraslado,
	eliminarTraslado
} from '../controllers/traslado.controller'
import { validarAutenticacion } from '../middlewares/auth.middleware'
import ExcelJS from 'exceljs'
import { db } from '../config/database'

const router = express.Router()

// Rutas CRUD para traslados
router.post('/', validarAutenticacion, crearTraslado)
router.get('/', validarAutenticacion, obtenerTraslados)
router.get('/:id', validarAutenticacion, obtenerTrasladoPorId)
router.put('/:id', validarAutenticacion, actualizarTraslado)
router.delete('/:id', validarAutenticacion, eliminarTraslado)

export const descargarExcel = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const [results] = await db.query('SELECT * FROM traslados')
		const traslados = results as any[]

		// Crear un nuevo libro de Excel
		const workbook = new ExcelJS.Workbook()
		const worksheet = workbook.addWorksheet('Traslados')

		// Definir las columnas del archivo Excel
		worksheet.columns = [
			{ header: 'Nombre del Trabajador', key: 'nombre_trabajador', width: 30 },
			{ header: 'Dirección de Inicio', key: 'direccion_inicio', width: 30 },
			{ header: 'Dirección de Fin', key: 'direccion_fin', width: 30 },
			{ header: 'Medio de Transporte', key: 'medio_transporte', width: 20 },
			{ header: 'Fecha de Viaje', key: 'fecha_viaje', width: 15 },
			{ header: 'Kilómetros', key: 'kilometros', width: 15 },
			{ header: 'Ida y Vuelta', key: 'ida_y_vuelta', width: 15 },
			{ header: 'Huella de Carbono', key: 'huella_carbono', width: 15 }
		]

		// Agregar filas con datos
		traslados.forEach(traslado => {
			worksheet.addRow({
				nombre_trabajador: traslado.nombre_trabajador,
				direccion_inicio: traslado.direccion_inicio,
				direccion_fin: traslado.direccion_fin,
				medio_transporte: traslado.medio_transporte,
				fecha_viaje: traslado.fecha_viaje,
				kilometros: traslado.kilometros,
				ida_y_vuelta: traslado.ida_y_vuelta ? 'Sí' : 'No',
				huella_carbono: traslado.huella_carbono.toFixed(2)
			})
		})

		// Configurar los headers para la descarga
		res.setHeader(
			'Content-Type',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		)
		res.setHeader('Content-Disposition', 'attachment; filename=traslados.xlsx')

		// Escribir el archivo en la respuesta
		await workbook.xlsx.write(res)
		res.end() // Finalizar la respuesta
	} catch (error) {
		console.error('Error al generar el archivo Excel:', error)
		res.status(500).json({ mensaje: 'Error al generar el archivo Excel' })
	}
}

export default router
