import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { AdminNavigation } from "../../components/admin/AdminNavigation";
import UserForm from "../../components/users/UserForm";
import { useAuth } from "../../contexts/AuthContext";

const UserEditPage: React.FC = () => {
  const { user } = useAuth();
  const { userId } = useParams<{ userId: string }>();

  // Verificar si el usuario tiene permisos para acceder a la edición de usuarios
  if (user?.role !== "admin") {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center p-8 max-w-md'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-16 w-16 text-red-500 mx-auto mb-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>
            Acceso Denegado
          </h2>
          <p className='text-gray-600 mb-4'>
            No tienes permisos para editar usuarios. Esta sección está reservada
            para administradores del sistema.
          </p>
          <a
            href='/dashboard'
            className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300'
          >
            Volver al Dashboard
          </a>
        </div>
      </div>
    );
  }

  // Verificar si se proporcionó un ID de usuario
  if (!userId) {
    return <Navigate to='/admin/users' replace />;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='md:w-1/4'>
          <AdminNavigation />
        </div>
        <div className='md:w-3/4'>
          <h1 className='text-2xl font-bold text-gray-800 mb-6'>
            Editar Usuario
          </h1>
          <UserForm mode='edit' />
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
