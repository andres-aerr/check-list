import React from "react";
import { Link } from "react-router-dom";

interface ChecklistCardProps {
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
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  simplified?: boolean;
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({
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
  simplified = false,
}) => {
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

  const getStatusLabel = (status: string) => {
    const statuses: Record<string, string> = {
      pending: "Pendiente",
      in_progress: "En Progreso",
      completed: "Completado",
    };
    return statuses[status] || status;
  };

  // Determinar la clase de borde y fondo según si es simplificado o no
  const cardClasses = simplified
    ? "bg-white shadow rounded-lg p-4 mb-4 border-l-4 border-green-500"
    : "bg-white shadow rounded-lg p-4 mb-4 border-l-4 border-blue-500";

  return (
    <div className={cardClasses}>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
          <div className='mt-1 flex items-center space-x-2'>
            <span className='px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800'>
              {getTypeLabel(type)}
            </span>
            {/* Estado eliminado según requerimiento */}
          </div>
        </div>
        <div className='flex space-x-2'>
          {onView && (
            <button
              onClick={onView}
              className='text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50'
              title='Ver detalles'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
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
          )}

          {onEdit && (
            <button
              onClick={onEdit}
              className='text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-50'
              title='Editar'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
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
            </button>
          )}

          {onDelete && (
            <button
              onClick={onDelete}
              className='text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50'
              title='Eliminar'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
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

      {!simplified && (
        <>
          <div className='mt-3 text-sm text-gray-600'>
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <span className='font-medium'>Asignado a:</span> {assignedTo}
              </div>
              <div>
                <span className='font-medium'>Fecha límite:</span> {dueDate}
              </div>
              <div>
                <span className='font-medium'>Creado:</span> {createdAt}
              </div>
            </div>
          </div>

          <div className='mt-3'>
            <Link
              to={`/checklists/progress/${id}`}
              className='inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800'
            >
              Ver progreso
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='ml-1 h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
