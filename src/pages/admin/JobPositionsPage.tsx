import React from "react";
import { JobPositionsManagement } from "../../components/admin/JobPositionsManagement";

export const JobPositionsPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Gestión de Puestos de Trabajo
          </h1>
          <p className='text-gray-600'>
            Administra y gestiona los puestos de trabajo y sus checklists
            asociados.
          </p>
        </div>

        {/* Contenido principal */}
        <div className='bg-white shadow-md rounded-lg p-6'>
          <JobPositionsManagement />
        </div>
      </div>
    </div>
  );
};
