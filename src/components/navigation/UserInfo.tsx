import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export const UserInfo = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Función para obtener el nombre de rol en español
  const getRoleName = (role: string) => {
    const roles: Record<string, string> = {
      admin: "Administrador",
      contract_admin: "Admin. de Contratos",
      preventionist: "Prevencionista",
      supervisor: "Supervisor",
      operational: "Operacional",
    };
    return roles[role] || role;
  };

  return (
    <div className='px-4 py-3 border-b border-gray-700'>
      <div className='flex items-center space-x-3'>
        <div className='flex-shrink-0'>
          <div className='h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium'>
            {user.email.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className='flex-1 min-w-0'>
          <p className='text-sm font-medium text-white truncate'>
            {user.email}
          </p>
          <p className='text-xs text-gray-400 truncate'>
            {getRoleName(user.role)}
          </p>
        </div>
      </div>
    </div>
  );
};
