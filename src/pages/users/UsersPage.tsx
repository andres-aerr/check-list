import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { UserList } from "../../components/users/UserList";
import { UserFormData } from "../../components/users/UserForm";
import { UserTabs } from "../../components/users/UserTabs";
import {
  UserFilters,
  UserFilters as UserFiltersType,
} from "../../components/users/UserFilters";
import { allUsers, User } from "../../data/usersData";

// Interfaz User importada desde usersData.ts

export const UsersPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // TODO: Implementar integración con backend
  const [users, setUsers] = useState<User[]>(allUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(allUsers);
  const [filters, setFilters] = useState<UserFiltersType>({
    searchTerm: "",
    role: "all",
    status: "all",
  });

  useEffect(() => {
    // Verificar si el usuario tiene permisos para gestionar usuarios
    if (user && user.role !== "admin") {
      setError("No tienes permisos para acceder a la gestión de usuarios");
      setLoading(false);
      return;
    }

    // TODO: Implementar integración con backend para cargar usuarios
    // Simulación de carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [user]);

  // Efecto para aplicar filtros cuando cambian
  useEffect(() => {
    applyFilters();
  }, [filters, users]);

  // Función para aplicar filtros a la lista de usuarios
  const applyFilters = () => {
    let result = [...users];

    // Filtrar por término de búsqueda (nombre o correo)
    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchTermLower) ||
          user.email.toLowerCase().includes(searchTermLower)
      );
    }

    // Filtrar por rol
    if (filters.role !== "all") {
      result = result.filter((user) => user.role === filters.role);
    }

    // Filtrar por estado
    if (filters.status !== "all") {
      result = result.filter((user) => user.status === filters.status);
    }

    setFilteredUsers(result);
  };

  // Manejar cambios en los filtros
  const handleFilterChange = (newFilters: UserFiltersType) => {
    setFilters(newFilters);
  };

  const handleUserCreated = (userData: UserFormData) => {
    // TODO: Implementar integración con backend para crear usuario
    // Simulación de creación de usuario
    const newUser: User = {
      id: `${Date.now()}`,
      fullName: userData.fullName,
      email: userData.email,
      role: userData.role,
      status: userData.status,
      lastLogin: "-",
      createdAt: new Date().toISOString(),
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleUserUpdated = (userId: string, userData: UserFormData) => {
    // TODO: Implementar integración con backend para actualizar usuario
    // Simulación de actualización de usuario
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              fullName: userData.fullName,
              email: userData.email,
              role: userData.role,
              status: userData.status,
            }
          : user
      )
    );
  };

  const handleUserDeleted = (userId: string) => {
    // TODO: Implementar integración con backend para eliminar usuario
    // Simulación de eliminación de usuario
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-100 p-6 flex justify-center items-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-100 p-6 flex justify-center items-center'>
        <div className='bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center'>
          <div className='text-red-500 text-5xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Error de acceso
          </h2>
          <p className='text-gray-600 mb-4'>{error}</p>
          <button
            onClick={() => window.history.back()}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Gestión de Usuarios
          </h1>
          <p className='text-gray-600'>
            Administra los usuarios del sistema, asigna roles y gestiona
            permisos.
          </p>
        </div>

        <div className='bg-white shadow-md rounded-lg p-6'>
          {/* Componente de filtros */}
          <UserFilters onFilterChange={handleFilterChange} />

          {/* Componente de pestañas */}
          <UserTabs
            users={filteredUsers}
            onUserCreated={handleUserCreated}
            onUserUpdated={handleUserUpdated}
            onUserDeleted={handleUserDeleted}
          />
        </div>
      </div>
    </div>
  );
};
