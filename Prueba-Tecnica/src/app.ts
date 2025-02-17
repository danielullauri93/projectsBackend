import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import trasladoRoutes from './routes/traslado.routes'
import authRoutes from './routes/auth.routes'
import { connectDB } from './config/database'
import path from 'path'

dotenv.config()

const app = express()

app.disable('x-powered-by') // desabilitar  el header de express
// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'views/dist')))

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Conectar a la base de datos
connectDB()

// Rutas de la API
app.use('/api/traslados', trasladoRoutes)
app.use('/api/auth', authRoutes)

// Ruta para servir el frontend (React)
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/dist/index.html'))
})

export default app
