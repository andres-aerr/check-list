import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, subAdminUsers, operationalUsers } from "../../data/usersData";
import {
  getAllJobPositions,
  getJobPositionById,
} from "../../data/jobPositionsData";
import { useNotification } from "../../contexts/NotificationContext";

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { showNotification } = useNotification();

  useEffect(() => {
    // Simular carga de datos desde una API
    setTimeout(() => {
      const allUsers = [...subAdminUsers, ...operationalUsers];
      setUsers(allUsers);
      setFilteredUsers(allUsers);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Filtrar usuarios según los criterios seleccionados
    let result = users;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por rol
    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter);
    }

    // Filtrar por estado
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(result);
  }, [users, searchTerm, roleFilter, statusFilter]);

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

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  return (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4 md:mb-0'>
          Gestión de Usuarios
        </h2>
        <Link
          to='/admin/users/new'
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
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
          Nuevo Usuario
        </Link>
      </div>

      <div className='mb-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='col-span-1 md:col-span-2'>
          <label
            htmlFor='search'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Buscar
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                className='h-5 w-5 text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <input
              type='text'
              name='search'
              id='search'
              className='focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md'
              placeholder='Buscar por nombre o email'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='role-filter'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Rol
          </label>
          <select
            id='role-filter'
            name='role-filter'
            className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value='all'>Todos los roles</option>
            <option value='admin'>Administrador</option>
            <option value='contract_admin'>Admin. de Contrato</option>
            <option value='preventionist'>Prevencionista</option>
            <option value='supervisor'>Supervisor</option>
            <option value='operational'>Operacional</option>
          </select>
        </div>

        <div>
          <label
            htmlFor='status-filter'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Estado
          </label>
          <select
            id='status-filter'
            name='status-filter'
            className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value='all'>Todos los estados</option>
            <option value='active'>Activo</option>
            <option value='inactive'>Inactivo</option>
          </select>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Nombre
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Email
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Rol
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Puesto de Trabajo
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Estado
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Último Acceso
              </th>
              <th scope='col' className='relative px-6 py-3'>
                <span className='sr-only'>Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredUsers.map((user) => (
              <tr key={user.id} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-gray-900'>
                    {user.fullName}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-500'>{user.email}</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-500'>
                    {getJobPositionName(user.jobPositionId)}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status === "active" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {new Date(user.lastLogin).toLocaleString("es-CL", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <Link
                    to={`/admin/users/detail/${user.id}`}
                    className='text-blue-600 hover:text-blue-900 mr-2'
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/admin/users/edit/${user.id}`}
                    className='text-blue-600 hover:text-blue-900 mr-2'
                  >
                    Editar
                  </Link>
                  <button
                    className={`${
                      user.status === "active"
                        ? "text-red-600 hover:text-red-900"
                        : "text-green-600 hover:text-green-900"
                    }`}
                    onClick={() => {
                      // Actualizar el estado del usuario
                      const updatedUsers = users.map((u) =>
                        u.id === user.id
                          ? {
                              ...u,
                              status:
                                u.status === "active" ? "inactive" : "active",
                            }
                          : u
                      );
                      setUsers(updatedUsers);

                      // Mostrar notificación usando el contexto
                      const newStatus =
                        user.status === "active" ? "inactive" : "active";
                      const statusText =
                        newStatus === "active" ? "activado" : "desactivado";

                      showNotification(
                        newStatus === "active" ? "success" : "warning",
                        `Usuario ${statusText}`,
                        `${user.fullName} ha sido ${statusText} correctamente.`
                      );
                    }}
                  >
                    {user.status === "active" ? "Desactivar" : "Activar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className='text-center py-4'>
          <p className='text-gray-500'>
            No se encontraron usuarios con los filtros seleccionados
          </p>
        </div>
      )}

      <div className='mt-4 flex justify-between items-center'>
        <div className='text-sm text-gray-700'>
          Mostrando <span className='font-medium'>{filteredUsers.length}</span>{" "}
          de <span className='font-medium'>{users.length}</span> usuarios
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
