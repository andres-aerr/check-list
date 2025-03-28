import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { User, subAdminUsers, operationalUsers } from "../../data/usersData";
import {
  getAllJobPositions,
  getJobPositionById,
} from "../../data/jobPositionsData";
import UserJobPositionHistory from "./UserJobPositionHistory";

const UserDetail: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (!userId) {
      setError("ID de usuario no proporcionado");
      setLoading(false);
      return;
    }

    // Simular carga de datos desde una API
    setTimeout(() => {
      const allUsers = [...subAdminUsers, ...operationalUsers];
      const foundUser = allUsers.find((u) => u.id === userId);

      if (foundUser) {
        setUser(foundUser);
      } else {
        setError("Usuario no encontrado");
      }

      setLoading(false);
    }, 500);
  }, [userId]);

  const getJobPositionName = (jobPositionId?: string) => {
    if (!jobPositionId) return "No asignado";
    const position = getJobPositionById(jobPositionId);
    return position ? position.name : "Desconocido";
  };

  const getRoleName = (role: string) => {
    const roles: Record<string, string> = {
      admin: "Administrador",
      contract_admin: "Admin. de Contrato",
      preventionist: "Prevencionista",
      operational: "Operacional",
      supervisor: "Supervisor",
    };
    return roles[role] || role;
  };

  const handleDeactivateUser = () => {
    if (!user) return;

    // Simular actualización de estado del usuario
    setLoading(true);
    setTimeout(() => {
      setUser({
        ...user,
        status: user.status === "active" ? "inactive" : "active",
      });
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className='bg-white shadow-md rounded-lg p-6'>
        <div className='text-center'>
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
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>Error</h2>
          <p className='text-gray-600 mb-4'>
            {error || "Usuario no disponible"}
          </p>
          <button
            onClick={() => navigate("/admin/users")}
            className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300'
          >
            Volver a la lista de usuarios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <div className='flex justify-between items-start mb-6'>
        <h2 className='text-xl font-semibold text-gray-800'>
          Detalles del Usuario
        </h2>
        <div className='flex space-x-2'>
          <Link
            to={`/admin/users/edit/${user.id}`}
            className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center transition-colors duration-300'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mr-2'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
              />
            </svg>
            Editar
          </Link>
          <button
            onClick={handleDeactivateUser}
            className={`${
              user.status === "active"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            } text-white font-medium py-2 px-4 rounded-md flex items-center transition-colors duration-300`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mr-2'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d={
                  user.status === "active"
                    ? "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                }
              />
            </svg>
            {user.status === "active" ? "Desactivar" : "Activar"}
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        <div>
          <h3 className='text-lg font-medium text-gray-700 mb-4'>
            Información Personal
          </h3>
          <div className='space-y-3'>
            <div>
              <span className='text-sm font-medium text-gray-500 block'>
                Nombre Completo
              </span>
              <span className='text-base text-gray-800'>{user.fullName}</span>
            </div>
            <div>
              <span className='text-sm font-medium text-gray-500 block'>
                Email
              </span>
              <span className='text-base text-gray-800'>{user.email}</span>
            </div>
            <div>
              <span className='text-sm font-medium text-gray-500 block'>
                Rol
              </span>
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : user.role === "preventionist"
                    ? "bg-green-100 text-green-800"
                    : user.role === "contract_admin"
                    ? "bg-blue-100 text-blue-800"
                    : user.role === "supervisor"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {getRoleName(user.role)}
              </span>
            </div>
            <div>
              <span className='text-sm font-medium text-gray-500 block'>
                Estado
              </span>
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.status === "active" ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className='text-lg font-medium text-gray-700 mb-4'>
            Información Laboral
          </h3>
          <div className='space-y-3'>
            <div>
              <span className='text-sm font-medium text-gray-500 block'>
                Puesto de Trabajo
              </span>
              <span className='text-base text-gray-800'>
                {getJobPositionName(user.jobPositionId)}
              </span>
            </div>
            <div>
              <span className='text-sm font-medium text-gray-500 block'>
                Fecha de Creación
              </span>
              <span className='text-base text-gray-800'>
                {new Date(user.createdAt).toLocaleDateString("es-CL")}
              </span>
            </div>
            <div>
              <span className='text-sm font-medium text-gray-500 block'>
                Último Acceso
              </span>
              <span className='text-base text-gray-800'>
                {new Date(user.lastLogin).toLocaleString("es-CL")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-gray-200 pt-4'>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className='flex items-center text-blue-600 hover:text-blue-800 font-medium'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-5 w-5 mr-1 transition-transform ${
              showHistory ? "transform rotate-90" : ""
            }`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
          {showHistory
            ? "Ocultar historial de puestos"
            : "Ver historial de puestos"}
        </button>

        {showHistory && (
          <div className='mt-4'>
            <UserJobPositionHistory userId={user.id} />
          </div>
        )}
      </div>

      <div className='mt-6 flex justify-end'>
        <button
          onClick={() => navigate("/admin/users")}
          className='px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Volver a la lista
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
