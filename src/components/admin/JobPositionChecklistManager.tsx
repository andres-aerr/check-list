import React, { useState, useEffect } from "react";
import { JobPosition } from "../../data/jobPositionsData";

interface JobPositionChecklistManagerProps {
  position: JobPosition;
  onSave: (position: JobPosition) => void;
  onCancel: () => void;
}

interface Checklist {
  id: string;
  name: string;
  description: string;
}

export const JobPositionChecklistManager: React.FC<
  JobPositionChecklistManagerProps
> = ({ position, onSave, onCancel }) => {
  const [selectedChecklists, setSelectedChecklists] = useState<string[]>(
    position.defaultChecklists || []
  );
  const [availableChecklists, setAvailableChecklists] = useState<Checklist[]>(
    []
  );

  useEffect(() => {
    // TODO: Cargar checklists disponibles desde la API
    // Simulación de carga de datos
    const mockChecklists: Checklist[] = [
      {
        id: "daily-machine-inspection",
        name: "Inspección Diaria de Maquinaria",
        description: "Checklist para la inspección diaria de maquinaria pesada",
      },
      {
        id: "safety-protocol",
        name: "Protocolo de Seguridad",
        description: "Checklist de protocolos de seguridad estándar",
      },
      {
        id: "area-safety-inspection",
        name: "Inspección de Seguridad de Área",
        description:
          "Checklist para inspección de seguridad del área de trabajo",
      },
      {
        id: "team-performance-review",
        name: "Revisión de Desempeño del Equipo",
        description: "Checklist para evaluar el desempeño del equipo",
      },
      {
        id: "safety-audit",
        name: "Auditoría de Seguridad",
        description: "Checklist para auditorías de seguridad",
      },
      {
        id: "risk-assessment",
        name: "Evaluación de Riesgos",
        description: "Checklist para evaluación de riesgos en el área",
      },
    ];

    setAvailableChecklists(mockChecklists);
  }, []);

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
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          Checklists para {position.name}
        </h3>
        <p className='text-sm text-gray-500'>
          Selecciona los checklists que serán asignados automáticamente a los
          usuarios con este puesto de trabajo.
        </p>
      </div>

      <div className='space-y-4'>
        {availableChecklists.map((checklist) => (
          <div
            key={checklist.id}
            className='flex items-start space-x-3 p-4 bg-gray-50 rounded-lg'
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
                className='text-sm font-medium text-gray-900 block'
              >
                {checklist.name}
              </label>
              <p className='text-sm text-gray-500 mt-1'>
                {checklist.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-end space-x-3'>
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
  );
};
