import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
	const { isAuthenticated, user, logout } = useAuth()

	return (
		<nav className="bg-gray-800 text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/" className="text-lg font-bold">
					🚗 Traslados App
				</Link>

				<ul className="flex space-x-4">
					{isAuthenticated ? (
						<>
							<Link to="/traslados" className="hover:underline">
								Listado de Traslados
							</Link>
							<Link to="/registro-traslados" className="hover:underline">
								Registrar Traslado
							</Link>

							{/* Mostrar nombre del usuario */}
							<span className="text-green-400">👤 {user?.nombre}</span>

							<button
								onClick={logout}
								className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
								Cerrar Sesión
							</button>
						</>
					) : (
						<>
							<Link to="/login" className="hover:underline">
								Iniciar Sesión
							</Link>
							<Link to="/registro" className="hover:underline">
								Registrarse
							</Link>
						</>
					)}
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
