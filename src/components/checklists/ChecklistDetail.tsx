import React from 'react';

interface ChecklistDetailProps {
  id: string;
  title: string;
  type: 'equipment' | 'mining' | 'explosives' | 'transport' | 'maintenance' | 'emergency';
  status: 'pending' | 'completed' | 'in_progress';
  assignedTo: string;
  dueDate: string;
  createdAt: string;
  description?: string;
  items: ChecklistItemDetail[];
  onBack: () => void;
  onEdit?: () => void;
  onStartChecklist?: () => void;
  onCompleteChecklist?: () => void;
}

interface ChecklistItemDetail {
  id: string;
  description: string;
  required: boolean;
  hasEvidence: boolean;
  completed?: boolean;
  evidence?: string;
  notes?: string;
}

export const ChecklistDetail: React.FC<ChecklistDetailProps> = ({
  title,
  type,
  status,
  assignedTo,
  dueDate,
  createdAt,
  description,
  items,
  onBack,
  onEdit,
  onStartChecklist,
  onCompleteChecklist
}) => {
  const getStatusColor = (status: ChecklistDetailProps['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: ChecklistDetailProps['type']) => {
    const types = {
      equipment: 'Equipos',
      mining: 'Minería',
      explosives: 'Explosivos',
      transport: 'Transporte',
      maintenance: 'Mantenimiento',
      emergency: 'Emergencia'
    };
    return types[type];
  };

  const getStatusLabel = (status: ChecklistDetailProps['status']) => {
    return status === 'in_progress'
      ? 'En Progreso'
      : status === 'completed'
      ? 'Completado'
      : 'Pendiente';
  };

  const isPending = status === 'pending';
  const isInProgress = status === 'in_progress';
  const isCompleted = status === 'completed';

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <button
            onClick={onBack}
            className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Volver
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <div className="flex items-center mt-2">
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                status
              )}`}
            >
              {getStatusLabel(status)}
            </span>
            <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
              {getTypeLabel(type)}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-3 py-1 border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-500 hover:text-white"
            >
              Editar
            </button>
          )}
          {isPending && onStartChecklist && (
            <button
              onClick={onStartChecklist}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Iniciar Checklist
            </button>
          )}
          {isInProgress && onCompleteChecklist && (
            <button
              onClick={onCompleteChecklist}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Completar Checklist
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Asignado a:</span> {assignedTo}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Fecha de vencimiento:</span>{' '}
            {new Date(dueDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Fecha de creación:</span>{' '}
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {description && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Descripción</h2>
          <p className="text-gray-700">{description}</p>
        </div>
      )}

      <div>
        <h2 className="text-lg font-medium mb-4">Ítems del Checklist</h2>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`p-4 border rounded-md ${item.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  {isInProgress && (
                    <input
                      type="checkbox"
                      checked={item.completed}
                      disabled={isCompleted}
                      className="h-5 w-5 text-blue-600 mt-0.5 mr-3"
                      readOnly
                    />
                  )}
                  <div>
                    <p className="font-medium">
                      {index + 1}. {item.description}
                    </p>
                    <div className="mt-1 flex space-x-2">
                      {item.required && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          Obligatorio
                        </span>
                      )}
                      {item.hasEvidence && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                          Requiere evidencia
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {isInProgress && (
                <div className="mt-3 pl-8">
                  {item.hasEvidence && (
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Evidencia
                      </label>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                          disabled={isCompleted}
                        >
                          Subir imagen
                        </button>
                        {item.evidence && (
                          <span className="ml-2 text-sm text-green-600">
                            Evidencia cargada
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notas
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      rows={2}
                      placeholder="Agregar notas o comentarios"
                      value={item.notes || ''}
                      disabled={isCompleted}
                      readOnly
                    />
                  </div>
                </div>
              )}

              {isCompleted && item.notes && (
                <div className="mt-3 pl-8">
                  <p className="text-sm font-medium text-gray-700">Notas:</p>
                  <p className="text-sm text-gray-600">{item.notes}</p>
                </div>
              )}

              {isCompleted && item.evidence && (
                <div className="mt-3 pl-8">
                  <p className="text-sm font-medium text-gray-700">Evidencia:</p>
                  <div className="mt-1 h-24 w-24 border border-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-xs text-gray-500">Imagen</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};