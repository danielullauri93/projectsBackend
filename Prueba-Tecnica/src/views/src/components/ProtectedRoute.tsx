import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface Props {
  children: React.JSX.Element
  role?: 'admin' | 'trabajador' // Permite restringir acceso por roles
}

const ProtectedRoute = ({ children, role }: Props) => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Si se especifica un rol y el usuario no lo tiene, redirigir al home
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
