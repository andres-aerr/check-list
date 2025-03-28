import React, { useState, useEffect } from "react";
import { JobPosition, getAllJobPositions } from "../../data/jobPositionsData";
import { JobPositionChecklistAssignment } from "./JobPositionChecklistAssignment";
import { JobPositionForm } from "./JobPositionForm";

export const JobPositionsManagement: React.FC = () => {
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(
    null
  );
  const [showJobPositionForm, setShowJobPositionForm] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    operationalRole: "",
  });

  useEffect(() => {
    // Cargar puestos de trabajo
    const positions = getAllJobPositions();
    setJobPositions(positions);
  }, []);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJobPositionSubmit = (jobPosition: JobPosition) => {
    setJobPositions((prev) => [...prev, jobPosition]);
    setShowJobPositionForm(false);
  };

  const filteredPositions = jobPositions.filter((position) => {
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      if (!position.name.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }

    if (
      filters.operationalRole &&
      position.operationalRole !== filters.operationalRole
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-900'>
          Gestión de Puestos de Trabajo
        </h2>
        <button
          onClick={() => setShowJobPositionForm(true)}
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
        >
          Nuevo Puesto
        </button>
      </div>

      {/* Filtros */}
      <div className='bg-white p-4 rounded-lg shadow'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Buscar
            </label>
            <input
              type='text'
              name='searchTerm'
              placeholder='Buscar por nombre...'
              className='w-full border border-gray-300 rounded-md p-2'
              value={filters.searchTerm}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Rol Operacional
            </label>
            <select
              name='operationalRole'
              className='w-full border border-gray-300 rounded-md p-2'
              value={filters.operationalRole}
              onChange={handleFilterChange}
            >
              <option value=''>Todos los roles</option>
              <option value='Usuario Operacional'>Usuario Operacional</option>
              <option value='Supervisor'>Supervisor</option>
              <option value='Prevencionista'>Prevencionista</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de puestos de trabajo */}
      <div className='bg-white shadow rounded-lg overflow-hidden'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Puesto
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Rol Operacional
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Requisitos
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredPositions.map((position) => (
              <tr key={position.id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex flex-col'>
                    <div className='text-sm font-medium text-gray-900'>
                      {position.name}
                    </div>
                    <div className='text-sm text-gray-500'>
                      {position.description}
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {position.operationalRole}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <div className='flex flex-col space-y-1'>
                    <span>
                      Supervisor: {position.requiredSupervisor ? "Sí" : "No"}
                    </span>
                    <span>
                      Prevencionista:{" "}
                      {position.requiredPreventionist ? "Sí" : "No"}
                    </span>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <button
                    className='text-indigo-600 hover:text-indigo-900 mr-2'
                    onClick={() => setSelectedPosition(position)}
                  >
                    Asignar Checklists
                  </button>
                  <button
                    className='text-red-600 hover:text-red-900'
                    onClick={() => {
                      setJobPositions((prev) =>
                        prev.filter((p) => p.id !== position.id)
                      );
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para crear/editar puesto de trabajo */}
      {showJobPositionForm && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                Crear Nuevo Puesto de Trabajo
              </h3>
              <JobPositionForm
                onSubmit={handleJobPositionSubmit}
                onCancel={() => setShowJobPositionForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal para asignar checklists */}
      {selectedPosition && (
        <JobPositionChecklistAssignment
          position={selectedPosition}
          onSave={(updatedPosition) => {
            setJobPositions((prev) =>
              prev.map((pos) =>
                pos.id === updatedPosition.id ? updatedPosition : pos
              )
            );
            setSelectedPosition(null);
          }}
          onCancel={() => setSelectedPosition(null)}
        />
      )}
    </div>
  );
};
