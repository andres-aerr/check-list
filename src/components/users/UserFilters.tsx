import React, { useState } from "react";

interface UserFiltersProps {
  onFilterChange: (filters: UserFilters) => void;
}

export interface UserFilters {
  searchTerm: string;
  role: string;
  status: string;
}

export const UserFilters: React.FC<UserFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<UserFilters>({
    searchTerm: "",
    role: "all",
    status: "all",
  });
  const [isExpanded, setIsExpanded] = useState(true);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      searchTerm: "",
      role: "all",
      status: "all",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className='bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200'>
      {/* Encabezado con botón para expandir/colapsar */}
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-medium text-gray-900'>
          Filtros de búsqueda
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='text-gray-500 hover:text-gray-700 focus:outline-none'
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Colapsar filtros" : "Expandir filtros"}
        >
          {isExpanded ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </button>
      </div>

      {/* Contenido de filtros (expandible) */}
      {isExpanded && (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Búsqueda por término */}
            <div>
              <label
                htmlFor='searchTerm'
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
                  id='searchTerm'
                  name='searchTerm'
                  value={filters.searchTerm}
                  onChange={handleFilterChange}
                  placeholder='Nombre o correo electrónico'
                  className='w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
            </div>

            {/* Filtro por rol */}
            <div>
              <label
                htmlFor='role'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Rol
              </label>
              <select
                id='role'
                name='role'
                value={filters.role}
                onChange={handleFilterChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              >
                <option value='all'>Todos los roles</option>
                <option value='contract_admin'>
                  Administrador de Contrato
                </option>
                <option value='preventionist'>Prevencionista</option>
                <option value='supervisor'>Supervisor/Jefatura</option>
                <option value='operational'>Usuario Operacional</option>
              </select>
            </div>

            {/* Filtro por estado */}
            <div>
              <label
                htmlFor='status'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Estado
              </label>
              <select
                id='status'
                name='status'
                value={filters.status}
                onChange={handleFilterChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              >
                <option value='all'>Todos los estados</option>
                <option value='active'>Activo</option>
                <option value='inactive'>Inactivo</option>
              </select>
            </div>
          </div>

          {/* Botones de acción */}
          <div className='mt-4 flex justify-end space-x-2'>
            <span className='text-sm text-gray-500 self-center mr-2'>
              {filters.searchTerm ||
              filters.role !== "all" ||
              filters.status !== "all"
                ? "Filtros aplicados"
                : "Sin filtros aplicados"}
            </span>
            <button
              onClick={handleReset}
              className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 mr-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
              Limpiar filtros
            </button>
          </div>
        </>
      )}
    </div>
  );
};
