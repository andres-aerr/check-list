import React from "react";
import { Link } from "react-router-dom";

interface ChecklistItemProps {
  id: string;
  title: string;
  type:
    | "equipment"
    | "mining"
    | "explosives"
    | "transport"
    | "maintenance"
    | "emergency";
  status: "pending" | "completed" | "in_progress";
  assignedTo: string;
  dueDate: string;
  createdAt: string;
  onView: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  id,
  title,
  type,
  status,
  assignedTo,
  dueDate,
  createdAt,
  onView,
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      equipment: "Equipos",
      mining: "Minería",
      explosives: "Explosivos",
      transport: "Transporte",
      maintenance: "Mantenimiento",
      emergency: "Emergencia",
    };
    return types[type] || type;
  };

  const getStatusLabel = (status: string) => {
    const statuses: Record<string, string> = {
      pending: "Pendiente",
      in_progress: "En Progreso",
      completed: "Completado",
    };
    return statuses[status] || status;
  };

  // Determinar la clase de borde y fondo según el tipo y estado
  const getTypeBorderColor = (type: string) => {
    switch (type) {
      case "equipment":
        return "border-blue-500";
      case "mining":
        return "border-yellow-500";
      case "explosives":
        return "border-red-500";
      case "transport":
        return "border-purple-500";
      case "maintenance":
        return "border-green-500";
      case "emergency":
        return "border-orange-500";
      default:
        return "border-gray-500";
    }
  };

  const cardClasses = `bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-4 mb-4 border-l-4 ${getTypeBorderColor(
    type
  )}`;

  return (
    <div className={cardClasses}>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
          <div className='mt-1 flex items-center space-x-2'>
            <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
              {getTypeLabel(type)}
            </span>
          </div>
        </div>
        <div className='flex space-x-1'>
          <button
            onClick={() => onView(id)}
            className='text-blue-600 hover:text-white p-1.5 rounded-md hover:bg-blue-600 transition-colors duration-200 border border-blue-200 hover:border-blue-600'
            title='Ver detalles'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              />
            </svg>
          </button>

          {onEdit && (
            <button
              onClick={() => onEdit(id)}
              className='text-yellow-600 hover:text-white p-1.5 rounded-md hover:bg-yellow-600 transition-colors duration-200 border border-yellow-200 hover:border-yellow-600 flex items-center'
              title='Editar checklist'
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
                  d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                />
              </svg>
              <span className='text-xs hidden sm:inline'>Editar</span>
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              className='text-red-600 hover:text-white p-1.5 rounded-md hover:bg-red-600 transition-colors duration-200 border border-red-200 hover:border-red-600'
              title='Eliminar'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
