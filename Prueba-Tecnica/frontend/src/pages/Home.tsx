import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
	const { user } = useAuth()

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-lg">
				<h1 className="text-3xl font-bold mb-4">Bienvenido {user?.nombre || 'Usuario'} 👋</h1>
				<p className="text-gray-700 mb-6">Accede rápidamente a las funciones del sistema:</p>

				<div className="grid grid-cols-1 gap-4 w-full">
					<Link to="/registro-traslados" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
						➕ Registrar Traslado
					</Link>
					<Link to="/traslados" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
						📋 Listado de Traslados
					</Link>
					<Link to="/buscar-traslados" className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
						🔍 Buscar Traslados
					</Link>
					{user?.role === 'admin' && (
						<Link to="/registro" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
							👤 Registrar Usuario
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

export default Home
