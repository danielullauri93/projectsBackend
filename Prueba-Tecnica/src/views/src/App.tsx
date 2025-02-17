import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import RegistroTraslados from './pages/RegistroTraslados'
import ListadoTraslados from './pages/ListadoTraslados'
import BuscarTraslados from './pages/BuscarTraslados'
import EditarTraslado from './pages/EditarTraslado'
import Login from './pages/Login'
import RegistroUsuario from './pages/RegistroUsuario'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<Routes>
					{/* Rutas públicas */}
					<Route path="/login" element={<Login />} />
					<Route path="/registro" element={<RegistroUsuario />} />

					{/* Rutas protegidas */}
					<Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
					<Route path="/registro-traslados" element={<ProtectedRoute><RegistroTraslados /></ProtectedRoute>} />
					<Route path="/traslados" element={<ProtectedRoute><ListadoTraslados /></ProtectedRoute>} />
					<Route path="/buscar-traslados" element={<ProtectedRoute><BuscarTraslados /></ProtectedRoute>} />
					<Route path="/editar-traslado/:id" element={<ProtectedRoute><EditarTraslado /></ProtectedRoute>} />
				</Routes>
				<Footer />
			</Router>
		</AuthProvider>
	)
}

export default App
