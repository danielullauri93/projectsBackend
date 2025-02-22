import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import { connectDB } from './config/database'
import trasladoRoutes from './routes/traslado.routes'
import authRoutes from './routes/auth.routes'

dotenv.config()

const app = express()

app.disable('x-powered-by') // Deshabilitar header de Express

// Middleware
app.use(cors()) // Habilitar CORS para permitir peticiones del frontend
app.use(morgan('dev'))
app.use(express.json())

// Rutas de la API
app.use('/api/traslados', trasladoRoutes)
app.use('/api/auth', authRoutes)

// Conectar a la base de datos
connectDB() // muestra en consola si esta conectado a la base de datos

// Servir el frontend desde la carpeta correcta
const frontendPath = path.join(__dirname, '../../Frontend/dist')
app.use(express.static(frontendPath))

// Ruta para servir el frontend
app.get('*', (req, res) => {
	res.sendFile(path.join(frontendPath, 'index.html'))
})

export default app
