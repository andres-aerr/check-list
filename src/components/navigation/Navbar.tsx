import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl">
                CheckList Minero
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/checklists"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Checklists
                    </Link>
                    {user && (user.role === 'admin' || user.role === 'preventionist') && (
                      <Link
                        to="/reports"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Reportes
                      </Link>
                    )}
                    {user && user.role === 'admin' && (
                      <>
                        <Link
                          to="/admin/dashboard"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          Panel Admin
                        </Link>
                        <Link
                          to="/users"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          Usuarios
                        </Link>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      to="/register"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          {isAuthenticated && (
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => {
                    logout();
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};