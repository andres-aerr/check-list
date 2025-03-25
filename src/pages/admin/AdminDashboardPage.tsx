import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AdminNavigation } from '../../components/admin/AdminNavigation';

interface DashboardCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  count?: number;
}

export const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalChecklists: 0,
    pendingChecklists: 0,
    completedChecklists: 0,
    recentActivities: 0
  });

  useEffect(() => {
    // Verificar si el usuario tiene permisos para acceder al dashboard de administración
    if (user && user.role !== 'admin') {
      setError('No tienes permisos para acceder al panel de administración');
      setLoading(false);
      return;
    }

    // TODO: Implementar integración con backend para cargar estadísticas
    // Simulación de carga de datos
    setTimeout(() => {
      setStats({
        totalUsers: 24,
        activeUsers: 18,
        totalChecklists: 156,
        pendingChecklists: 42,
        completedChecklists: 114,
        recentActivities: 78
      });
      setLoading(false);
    }, 800);
  }, [user]);

  const adminCards: DashboardCard[] = [
    {
      title: 'Gestión de Usuarios',
      description: 'Administra usuarios, asigna roles y gestiona permisos',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      link: '/users',
      count: stats.totalUsers
    },
    {
      title: 'Gestión de Checklists',
      description: 'Crea, edita y asigna checklists a los usuarios',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
      link: '/checklists',
      count: stats.totalChecklists
    },
    {
      title: 'Reportes y Análisis',
      description: 'Visualiza estadísticas y genera reportes detallados',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-purple-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      link: '/reports',
      count: stats.completedChecklists
    },
    {
      title: 'Auditoría y Monitoreo',
      description: 'Monitorea actividades y audita el sistema',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      link: '/admin/audit-log',
      count: stats.recentActivities
    },
    {
      title: 'Configuración del Sistema',
      description: 'Configura parámetros globales y seguridad',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      link: '/admin/system-config'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error de acceso</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
          <p className="text-gray-600">
            Bienvenido al panel de administración. Desde aquí puedes gestionar todos los aspectos del sistema.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Navegación lateral */}
          <div className="md:col-span-1">
            <AdminNavigation />

            <div className="bg-white shadow-md rounded-lg p-4 mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Resumen del Sistema</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Usuarios totales:</span>
                  <span className="font-medium">{stats.totalUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Usuarios activos:</span>
                  <span className="font-medium">{stats.activeUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Checklists totales:</span>
                  <span className="font-medium">{stats.totalChecklists}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Checklists pendientes:</span>
                  <span className="font-medium">{stats.pendingChecklists}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Checklists completados:</span>
                  <span className="font-medium">{stats.completedChecklists}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjetas de acceso rápido */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminCards.map((card, index) => (
                <Link
                  key={index}
                  to={card.link}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center mb-4">
                    {card.icon}
                    {card.count !== undefined && (
                      <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {card.count}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm">{card.description}</p>
                </Link>
              ))}
            </div>

            {/* Actividad reciente */}
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Actividad Reciente</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Nuevo usuario registrado</p>
                    <p className="text-sm text-gray-500">Carlos Rodríguez se ha registrado como Supervisor</p>
                    <p className="text-xs text-gray-400 mt-1">Hace 10 minutos</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Checklist completado</p>
                    <p className="text-sm text-gray-500">María González completó el checklist de Inspección Camión Minero #456</p>
                    <p className="text-xs text-gray-400 mt-1">Hace 25 minutos</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Alerta de seguridad</p>
                    <p className="text-sm text-gray-500">Se ha reportado un problema en el checklist de Perforación Zona Sur</p>
                    <p className="text-xs text-gray-400 mt-1">Hace 1 hora</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-purple-100 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Configuración actualizada</p>
                    <p className="text-sm text-gray-500">Se ha actualizado la configuración de seguridad del sistema</p>
                    <p className="text-xs text-gray-400 mt-1">Hace 3 horas</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link
                  to="/admin/audit-log"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Ver todas las actividades
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};