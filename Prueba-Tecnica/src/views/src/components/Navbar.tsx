import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Herramienta de Traslados</Link>
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/registro-traslados">Registro de Traslados</Link>
            <Link to="/traslados">Listado de Traslados</Link>
            {user?.role === 'admin' && <Link to="/buscar-traslados">Buscar Traslados</Link>}
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/registro">Registro de Usuarios</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
