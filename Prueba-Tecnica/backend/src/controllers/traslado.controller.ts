import { Request, Response } from 'express'
import { db } from '../config/database'
import { calcularHuellaCarbono } from '../services/traslado.service'
import { validarTraslado } from '../validations/traslado.validation'
import { Traslado } from '../types/trasladoTypes'

// Controlador para crear un nuevo traslado
type InsertResult = { insertId: number }

export const crearTraslado = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const datosTraslado = validarTraslado(req.body)
		const huellaCarbono = calcularHuellaCarbono(
			datosTraslado.kilometros,
			datosTraslado.medio_transporte
		)

		const [
			result
		] = await db.query(
			'INSERT INTO traslados (nombre_trabajador, direccion_inicio, direccion_fin, medio_transporte, fecha_viaje, kilometros, ida_y_vuelta, huella_carbono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
			[
				datosTraslado.nombre_trabajador,
				datosTraslado.direccion_inicio,
				datosTraslado.direccion_fin,
				datosTraslado.medio_transporte,
				datosTraslado.fecha_viaje,
				datosTraslado.kilometros,
				datosTraslado.ida_y_vuelta,
				huellaCarbono
			]
		)

		res.status(201).json({
			mensaje: 'Traslado creado correctamente',
			id: (result as InsertResult).insertId
		})
	} catch (error) {
		console.error('Error al crear traslado:', error)
		res.status(500).json({ mensaje: 'Error al crear traslado' })
	}
}

// Controlador para obtener todos los traslados
export const obtenerTraslados = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const [traslados] = await db.query('SELECT * FROM traslados')
		res.status(200).json(traslados as Traslado[])
	} catch (error) {
		console.error('Error al obtener traslados:', error)
		res.status(500).json({ mensaje: 'Error al obtener traslados' })
	}
}

// Controlador para obtener un traslado por ID
export const obtenerTrasladoPorId = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const [
			traslado
		]: any[] = await db.query('SELECT * FROM traslados WHERE id = ?', [
			req.params.id
		])

		if (traslado.length === 0) {
			res.status(404).json({ mensaje: 'Traslado no encontrado' })
			return
		}

		res.status(200).json(traslado[0])
	} catch (error) {
		console.error('Error al obtener traslado:', error)
		res.status(500).json({ mensaje: 'Error al obtener traslado' })
	}
}

// Controlador para actualizar un traslado
export const actualizarTraslado = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const datosTraslado = validarTraslado(req.body)
		const huellaCarbono = calcularHuellaCarbono(
			datosTraslado.kilometros,
			datosTraslado.medio_transporte
		)

		await db.query(
			'UPDATE traslados SET nombre_trabajador = ?, direccion_inicio = ?, direccion_fin = ?, medio_transporte = ?, fecha_viaje = ?, kilometros = ?, ida_y_vuelta = ?, huella_carbono = ? WHERE id = ?',
			[
				datosTraslado.nombre_trabajador,
				datosTraslado.direccion_inicio,
				datosTraslado.direccion_fin,
				datosTraslado.medio_transporte,
				datosTraslado.fecha_viaje,
				datosTraslado.kilometros,
				datosTraslado.ida_y_vuelta,
				huellaCarbono,
				req.params.id
			]
		)

		res.status(200).json({ mensaje: 'Traslado actualizado correctamente' })
	} catch (error) {
		console.error('Error al actualizar traslado:', error)
		res.status(500).json({ mensaje: 'Error al actualizar traslado' })
	}
}

// Controlador para eliminar un traslado
export const eliminarTraslado = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		await db.query('DELETE FROM traslados WHERE id = ?', [req.params.id])
		res.status(200).json({ mensaje: 'Traslado eliminado correctamente' })
	} catch (error) {
		console.error('Error al eliminar traslado:', error)
		res.status(500).json({ mensaje: 'Error al eliminar traslado' })
	}
}
