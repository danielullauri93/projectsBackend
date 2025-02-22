import express from 'express'
import {
	crearTraslado,
	obtenerTraslados,
	obtenerTrasladoPorId,
	actualizarTraslado,
	eliminarTraslado
} from '../controllers/traslado.controller' // 
import { validarAutenticacion } from '../middlewares/auth.middleware'
import { descargarExcel } from '../controllers/excel.controller'

const router = express.Router()

// Rutas CRUD para traslados
router.post('/', validarAutenticacion, crearTraslado)
router.get('/', validarAutenticacion, obtenerTraslados)
router.get('/:id', validarAutenticacion, obtenerTrasladoPorId)
router.put('/:id', validarAutenticacion, actualizarTraslado)
router.delete('/:id', validarAutenticacion, eliminarTraslado)

// Ruta para descargar el Excel
router.get('/descargar-excel', validarAutenticacion, descargarExcel)



export default router
