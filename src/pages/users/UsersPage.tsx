import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserList } from '../../components/users/UserList';
import { UserFormData } from '../../components/users/UserForm';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'contract_admin' | 'preventionist' | 'operational' | 'supervisor';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

export const UsersPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // TODO: Implementar integración con backend
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      fullName: 'Juan Pérez',
      email: 'juan.perez@minera.com',
      role: 'operational',
      status: 'active',
      lastLogin: '2024-01-20T10:30:00',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      fullName: 'María González',
      email: 'maria.gonzalez@minera.com',
      role: 'preventionist',
      status: 'active',
      lastLogin: '2024-01-20T09:15:00',
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      fullName: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@minera.com',
      role: 'supervisor',
      status: 'inactive',
      lastLogin: '2024-01-19T16:45:00',
      createdAt: '2024-01-01'
    }
  ]);

  useEffect(() => {
    // Verificar si el usuario tiene permisos para gestionar usuarios
    if (user && user.role !== 'admin') {
      setError('No tienes permisos para acceder a la gestión de usuarios');
      setLoading(false);
      return;
    }

    // TODO: Implementar integración con backend para cargar usuarios
    // Simulación de carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [user]);

  const handleUserCreated = (userData: UserFormData) => {
    // TODO: Implementar integración con backend para crear usuario
    // Simulación de creación de usuario
    const newUser: User = {
      id: `${Date.now()}`,
      fullName: userData.fullName,
      email: userData.email,
      role: userData.role,
      status: userData.status,
      lastLogin: '-',
      createdAt: new Date().toISOString()
    };

    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  const handleUserUpdated = (userId: string, userData: UserFormData) => {
    // TODO: Implementar integración con backend para actualizar usuario
    // Simulación de actualización de usuario
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? {
              ...user,
              fullName: userData.fullName,
              email: userData.email,
              role: userData.role,
              status: userData.status
            }
          : user
      )
    );
  };

  const handleUserDeleted = (userId: string) => {
    // TODO: Implementar integración con backend para eliminar usuario
    // Simulación de eliminación de usuario
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h1>
          <p className="text-gray-600">
            Administra los usuarios del sistema, asigna roles y gestiona permisos.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <UserList
            users={users}
            onUserCreated={handleUserCreated}
            onUserUpdated={handleUserUpdated}
            onUserDeleted={handleUserDeleted}
          />
        </div>
      </div>
    </div>
  );
};