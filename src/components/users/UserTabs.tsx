import React, { useState } from "react";
import { UserList } from "./UserList";
import { UserFormData } from "./UserForm";

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

interface UserTabsProps {
  users: User[];
  onUserCreated: (user: UserFormData) => void;
  onUserUpdated: (userId: string, user: UserFormData) => void;
  onUserDeleted: (userId: string) => void;
}

export const UserTabs: React.FC<UserTabsProps> = ({
  users,
  onUserCreated,
  onUserUpdated,
  onUserDeleted,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "subadmins" | "workers">(
    "all"
  );

  // Filtrar usuarios por tipo (subadministradores o trabajadores)
  const subadmins = users.filter((user) =>
    ["contract_admin", "preventionist", "supervisor"].includes(user.role)
  );

  const workers = users.filter((user) => user.role === "operational");

  return (
    <div className='space-y-6'>
      {/* Pestañas */}
      <div className='border-b border-gray-200'>
        <nav className='-mb-px flex space-x-8'>
          <button
            onClick={() => setActiveTab("all")}
            className={`${
              activeTab === "all"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } 
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Todos
            <span className='ml-2 py-0.5 px-2.5 text-xs rounded-full bg-gray-100'>
              {users.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("subadmins")}
            className={`${
              activeTab === "subadmins"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } 
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Subadministradores
            <span className='ml-2 py-0.5 px-2.5 text-xs rounded-full bg-gray-100'>
              {subadmins.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("workers")}
            className={`${
              activeTab === "workers"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } 
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Trabajadores
            <span className='ml-2 py-0.5 px-2.5 text-xs rounded-full bg-gray-100'>
              {workers.length}
            </span>
          </button>
        </nav>
      </div>

      {/* Contenido de la pestaña activa */}
      <div>
        {activeTab === "all" ? (
          <div>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>
              Gestión de Todos los Usuarios
            </h2>
            {users.length > 0 ? (
              <div className='space-y-4'>
                <UserList
                  users={users}
                  onUserCreated={onUserCreated}
                  onUserUpdated={onUserUpdated}
                  onUserDeleted={onUserDeleted}
                />
              </div>
            ) : (
              <div className='text-center py-8'>
                <p className='text-gray-500'>No hay usuarios registrados.</p>
              </div>
            )}
          </div>
        ) : activeTab === "subadmins" ? (
          <div>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>
              Gestión de Subadministradores
            </h2>
            {subadmins.length > 0 ? (
              <div className='space-y-4'>
                <UserList
                  users={subadmins}
                  onUserCreated={onUserCreated}
                  onUserUpdated={onUserUpdated}
                  onUserDeleted={onUserDeleted}
                />
              </div>
            ) : (
              <div className='text-center py-8'>
                <p className='text-gray-500'>
                  No hay subadministradores registrados.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>
              Gestión de Trabajadores
            </h2>
            {workers.length > 0 ? (
              <div className='space-y-4'>
                <UserList
                  users={workers}
                  onUserCreated={onUserCreated}
                  onUserUpdated={onUserUpdated}
                  onUserDeleted={onUserDeleted}
                />
              </div>
            ) : (
              <div className='text-center py-8'>
                <p className='text-gray-500'>
                  No hay trabajadores registrados.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
