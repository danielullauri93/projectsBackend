import express from 'express'
import {
	obtenerUsuarioAutenticado,
	iniciarSesion,
	registrarUsuario
} from '../controllers/auth.controller'
import { validarAutenticacion } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/registro', registrarUsuario)
router.post('/login', iniciarSesion)

// ruta para obtener el usuario autenticado
router.get('/me', validarAutenticacion, obtenerUsuarioAutenticado)

export default router
