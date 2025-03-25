import React from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  role:
    | "admin"
    | "contract_admin"
    | "preventionist"
    | "operational"
    | "supervisor";
  status: "active" | "inactive";
  lastLogin: string;
  createdAt: string;
}

interface UserDetailProps {
  user: User;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
  onAssignChecklists?: (userId: string) => void;
}

export const UserDetail: React.FC<UserDetailProps> = ({
  user,
  onEdit,
  onDelete,
  onAssignChecklists,
}) => {
  const getRoleLabel = (role: User["role"]) => {
    const roles = {
      admin: "Administrador General",
      contract_admin: "Administrador de Contrato",
      preventionist: "Prevencionista",
      operational: "Usuario Operacional",
      supervisor: "Supervisor/Jefatura",
    };
    return roles[role];
  };

  // Determinar si el usuario puede tener checklists asignados (solo usuarios operacionales y supervisores)
  const canAssignChecklists = ["operational", "supervisor"].includes(user.role);

  return (
    <div className='bg-white shadow-md rounded-lg p-6 mb-4'>
      <div className='flex justify-between items-start'>
        <div>
          <h2 className='text-xl font-bold text-gray-900'>{user.fullName}</h2>
          <p className='text-sm text-gray-500'>{user.email}</p>
        </div>
        <div className='flex space-x-2'>
          {canAssignChecklists && onAssignChecklists && (
            <button
              onClick={() => onAssignChecklists(user.id)}
              className='px-3 py-1 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white'
            >
              Asignar Checklists
            </button>
          )}
          <button
            onClick={() => onEdit(user.id)}
            className='px-3 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white'
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className='px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white'
          >
            Eliminar
          </button>
        </div>
      </div>

      <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <p className='text-sm'>
            <span className='font-medium text-gray-700'>Rol:</span>{" "}
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
              {getRoleLabel(user.role)}
            </span>
          </p>
        </div>
        <div>
          <p className='text-sm'>
            <span className='font-medium text-gray-700'>Estado:</span>{" "}
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                user.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {user.status === "active" ? "Activo" : "Inactivo"}
            </span>
          </p>
        </div>
        <div>
          <p className='text-sm'>
            <span className='font-medium text-gray-700'>Último acceso:</span>{" "}
            {new Date(user.lastLogin).toLocaleString()}
          </p>
        </div>
        <div>
          <p className='text-sm'>
            <span className='font-medium text-gray-700'>
              Fecha de creación:
            </span>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
