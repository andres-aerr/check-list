import React, { useState, useEffect } from "react";
import { JobPositionHistory } from "../../data/jobPositionsData";

interface UserJobPositionHistoryProps {
  userId: string;
}

const UserJobPositionHistory: React.FC<UserJobPositionHistoryProps> = ({
  userId,
}) => {
  const [history, setHistory] = useState<JobPositionHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos desde una API
    setLoading(true);
    setTimeout(() => {
      // Datos de ejemplo para el historial de puestos de trabajo
      const mockHistory: JobPositionHistory[] = [
        {
          id: "1",
          userId: userId,
          oldPosition: null,
          newPosition: "underground-operator",
          changedBy: "admin",
          changedAt: "2023-12-01T10:00:00Z",
          reason: "Asignación inicial",
        },
        {
          id: "2",
          userId: userId,
          oldPosition: "underground-operator",
          newPosition: "master-builder",
          changedBy: "admin",
          changedAt: "2024-02-15T14:30:00Z",
          reason: "Promoción por buen desempeño",
        },
        {
          id: "3",
          userId: userId,
          oldPosition: "master-builder",
          newPosition: "rigger",
          changedBy: "admin",
          changedAt: "2024-04-10T09:15:00Z",
          reason: "Cambio por necesidades operativas",
        },
      ];

      // Filtrar solo el historial del usuario actual
      const userHistory = mockHistory.filter((item) => item.userId === userId);
      setHistory(userHistory);
      setLoading(false);
    }, 500);
  }, [userId]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-24'>
        <div className='animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className='bg-gray-50 p-4 rounded-md'>
        <p className='text-gray-500 text-sm'>
          No hay historial de cambios de puesto para este usuario.
        </p>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-md shadow-sm'>
      <h3 className='text-md font-medium text-gray-700 mb-2'>
        Historial de Puestos
      </h3>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Fecha
              </th>
              <th
                scope='col'
                className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Puesto Anterior
              </th>
              <th
                scope='col'
                className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Nuevo Puesto
              </th>
              <th
                scope='col'
                className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Motivo
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {history.map((item) => (
              <tr key={item.id} className='hover:bg-gray-50'>
                <td className='px-4 py-2 whitespace-nowrap text-xs text-gray-500'>
                  {new Date(item.changedAt).toLocaleString("es-CL")}
                </td>
                <td className='px-4 py-2 whitespace-nowrap text-xs text-gray-500'>
                  {item.oldPosition ? item.oldPosition : "Primer puesto"}
                </td>
                <td className='px-4 py-2 whitespace-nowrap text-xs text-gray-500'>
                  {item.newPosition}
                </td>
                <td className='px-4 py-2 whitespace-nowrap text-xs text-gray-500'>
                  {item.reason || "No especificado"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserJobPositionHistory;
