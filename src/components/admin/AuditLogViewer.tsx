import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: 'login' | 'logout' | 'create' | 'update' | 'delete' | 'view' | 'export' | 'assign';
  resourceType: 'user' | 'checklist' | 'report' | 'system_config';
  resourceId: string;
  resourceName: string;
  details: string;
  ipAddress: string;
}

interface AuditLogViewerProps {
  initialLogs?: AuditLogEntry[];
  onExport?: (format: 'pdf' | 'excel' | 'csv') => void;
}

export const AuditLogViewer: React.FC<AuditLogViewerProps> = ({ 
  initialLogs = [],
  onExport 
}) => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<AuditLogEntry[]>(initialLogs);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    userId: '',
    action: '',
    resourceType: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Verificar si el usuario tiene permisos de administrador
  if (user?.role !== 'admin') {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-center text-red-500">
          <p>No tienes permisos para acceder a esta sección.</p>
        </div>
      </div>
    );
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1); // Resetear a la primera página cuando se cambian los filtros
  };

  const applyFilters = () => {
    // En una implementación real, aquí se haría la llamada a la API con los filtros
    // Por ahora, simulamos el filtrado en el cliente
    return logs.filter(log => {
      const matchesStartDate = !filters.startDate || new Date(log.timestamp) >= new Date(filters.startDate);
      const matchesEndDate = !filters.endDate || new Date(log.timestamp) <= new Date(filters.endDate);
      const matchesUserId = !filters.userId || log.userId === filters.userId || log.userName.toLowerCase().includes(filters.userId.toLowerCase());
      const matchesAction = !filters.action || log.action === filters.action;
      const matchesResourceType = !filters.resourceType || log.resourceType === filters.resourceType;
      
      return matchesStartDate && matchesEndDate && matchesUserId && matchesAction && matchesResourceType;
    });
  };

  const filteredLogs = applyFilters();
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getActionLabel = (action: AuditLogEntry['action']) => {
    const actions = {
      login: 'Inicio de sesión',
      logout: 'Cierre de sesión',
      create: 'Creación',
      update: 'Actualización',
      delete: 'Eliminación',
      view: 'Visualización',
      export: 'Exportación',
      assign: 'Asignación'
    };
    return actions[action];
  };

  const getResourceTypeLabel = (resourceType: AuditLogEntry['resourceType']) => {
    const types = {
      user: 'Usuario',
      checklist: 'Checklist',
      report: 'Reporte',
      system_config: 'Configuración del sistema'
    };
    return types[resourceType];
  };

  const getActionColor = (action: AuditLogEntry['action']) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-800';
      case 'update':
        return 'bg-blue-100 text-blue-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      case 'login':
      case 'logout':
        return 'bg-purple-100 text-purple-800';
      case 'view':
        return 'bg-gray-100 text-gray-800';
      case 'export':
        return 'bg-yellow-100 text-yellow-800';
      case 'assign':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Registro de Auditoría</h2>
        {onExport && (
          <div className="flex space-x-2">
            <button
              onClick={() => onExport('pdf')}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Exportar PDF
            </button>
            <button
              onClick={() => onExport('excel')}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Exportar Excel
            </button>
            <button
              onClick={() => onExport('csv')}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Exportar CSV
            </button>
          </div>
        )}
      </div>

      {/* Filtros */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md">
        <h3 className="text-lg font-medium mb-3">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Inicio
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Fin
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={filters.userId}
              onChange={handleFilterChange}
              placeholder="Nombre o ID de usuario"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">
              Acción
            </label>
            <select
              id="action"
              name="action"
              value={filters.action}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Todas las acciones</option>
              <option value="login">Inicio de sesión</option>
              <option value="logout">Cierre de sesión</option>
              <option value="create">Creación</option>
              <option value="update">Actualización</option>
              <option value="delete">Eliminación</option>
              <option value="view">Visualización</option>
              <option value="export">Exportación</option>
              <option value="assign">Asignación</option>
            </select>
          </div>
          <div>
            <label htmlFor="resourceType" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Recurso
            </label>
            <select
              id="resourceType"
              name="resourceType"
              value={filters.resourceType}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Todos los recursos</option>
              <option value="user">Usuario</option>
              <option value="checklist">Checklist</option>
              <option value="report">Reporte</option>
              <option value="system_config">Configuración del sistema</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de registros */}
      {paginatedLogs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acción
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recurso
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detalles
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                    <div className="text-sm text-gray-500">{log.userId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionColor(log.action)}`}>
                      {getActionLabel(log.action)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getResourceTypeLabel(log.resourceType)}</div>
                    <div className="text-sm text-gray-500">{log.resourceName}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron registros que coincidan con los filtros.</p>
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div>
            <span className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredLogs.length)}</span> de <span className="font-medium">{filteredLogs.length}</span> resultados
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
            >
              Anterior
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Mostrar 5 páginas centradas en la página actual
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 border rounded-md ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};