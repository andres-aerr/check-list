import React, { useState, useEffect } from "react";
import { JobPosition } from "../../data/jobPositionsData";
import { useChecklistCategory } from "../../contexts/ChecklistCategoryContext";

interface JobPositionChecklistAssignmentProps {
  position: JobPosition;
  onSave: (position: JobPosition) => void;
  onCancel: () => void;
}

export const JobPositionChecklistAssignment: React.FC<
  JobPositionChecklistAssignmentProps
> = ({ position, onSave, onCancel }) => {
  const { getAllChecklists } = useChecklistCategory();
  const [selectedChecklists, setSelectedChecklists] = useState<string[]>(
    position.defaultChecklists || []
  );
  const [searchTerm, setSearchTerm] = useState("");

  const allChecklists = getAllChecklists();

  // Filtrar checklists por término de búsqueda
  const filteredChecklists = allChecklists.filter((checklist) =>
    checklist.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChecklistToggle = (checklistId: string) => {
    setSelectedChecklists((prev) =>
      prev.includes(checklistId)
        ? prev.filter((id) => id !== checklistId)
        : [...prev, checklistId]
    );
  };

  const handleSave = () => {
    onSave({
      ...position,
      defaultChecklists: selectedChecklists,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
      <div className='relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white'>
        <div className='mt-3'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Asignar Checklists a {position.name}
          </h3>

          {/* Barra de búsqueda */}
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Buscar checklists...'
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Lista de checklists */}
          <div className='max-h-[400px] overflow-y-auto'>
            {filteredChecklists.map((checklist) => (
              <div
                key={checklist.id}
                className='flex items-start space-x-3 p-4 hover:bg-gray-50 border-b border-gray-200'
              >
                <input
                  type='checkbox'
                  id={checklist.id}
                  checked={selectedChecklists.includes(checklist.id)}
                  onChange={() => handleChecklistToggle(checklist.id)}
                  className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1'
                />
                <div className='flex-1'>
                  <label
                    htmlFor={checklist.id}
                    className='text-sm font-medium text-gray-900 block cursor-pointer'
                  >
                    {checklist.title}
                  </label>
                  <span className='text-xs text-gray-500'>
                    {checklist.type === "equipment"
                      ? "Equipamiento"
                      : checklist.type === "mining"
                      ? "Minería"
                      : checklist.type === "safety"
                      ? "Seguridad"
                      : "General"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Botones de acción */}
          <div className='flex justify-end space-x-3 mt-4'>
            <button
              type='button'
              onClick={onCancel}
              className='px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Cancelar
            </button>
            <button
              type='button'
              onClick={handleSave}
              className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
