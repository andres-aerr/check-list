import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AuditLogViewer } from '../../components/admin/AuditLogViewer';

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

export const AuditLogPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);

  useEffect(() => {
    // Verificar si el usuario tiene permisos para acceder a la auditoría
    if (user && user.role !== 'admin') {
      setError('No tienes permisos para acceder al registro de auditoría');
      setLoading(false);
      return;
    }

    // TODO: Implementar integración con backend para cargar logs de auditoría
    // Simulación de carga de datos
    setTimeout(() => {
      // Generar datos de ejemplo para la demostración
      const sampleLogs: AuditLogEntry[] = [
        {
          id: '1',
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutos atrás
          userId: 'admin1',
          userName: 'Administrador General',
          action: 'login',
          resourceType: 'user',
          resourceId: 'admin1',
          resourceName: 'Administrador General',
          details: 'Inicio de sesión exitoso',
          ipAddress: '192.168.1.100'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutos atrás
          userId: 'admin1',
          userName: 'Administrador General',
          action: 'create',
          resourceType: 'user',
          resourceId: 'user123',
          resourceName: 'Juan Pérez',
          details: 'Creación de nuevo usuario con rol Operacional',
          ipAddress: '192.168.1.100'
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutos atrás
          userId: 'admin1',
          userName: 'Administrador General',
          action: 'update',
          resourceType: 'system_config',
          resourceId: 'security',
          resourceName: 'Configuración de Seguridad',
          details: 'Actualización de parámetros de seguridad: tiempo de sesión cambiado a 30 minutos',
          ipAddress: '192.168.1.100'
        },
        {
          id: '4',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutos atrás
          userId: 'user456',
          userName: 'María González',
          action: 'login',
          resourceType: 'user',
          resourceId: 'user456',
          resourceName: 'María González',
          details: 'Inicio de sesión exitoso',
          ipAddress: '192.168.1.101'
        },
        {
          id: '5',
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutos atrás
          userId: 'user456',
          userName: 'María González',
          action: 'view',
          resourceType: 'checklist',
          resourceId: 'checklist123',
          resourceName: 'Inspección Camión Minero #456',
          details: 'Visualización de detalles del checklist',
          ipAddress: '192.168.1.101'
        },
        {
          id: '6',
          timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hora atrás
          userId: 'user789',
          userName: 'Carlos Rodríguez',
          action: 'update',
          resourceType: 'checklist',
          resourceId: 'checklist456',
          resourceName: 'Checklist Perforación Zona Sur',
          details: 'Actualización de estado: Completado',
          ipAddress: '192.168.1.102'
        },
        {
          id: '7',
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 horas atrás
          userId: 'admin1',
          userName: 'Administrador General',
          action: 'delete',
          resourceType: 'user',
          resourceId: 'user999',
          resourceName: 'Usuario Inactivo',
          details: 'Eliminación de usuario inactivo',
          ipAddress: '192.168.1.100'
        },
        {
          id: '8',
          timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 horas atrás
          userId: 'admin1',
          userName: 'Administrador General',
          action: 'export',
          resourceType: 'report',
          resourceId: 'report123',
          resourceName: 'Reporte Mensual de Cumplimiento',
          details: 'Exportación de reporte en formato PDF',
          ipAddress: '192.168.1.100'
        },
        {
          id: '9',
          timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 horas atrás
          userId: 'user456',
          userName: 'María González',
          action: 'assign',
          resourceType: 'checklist',
          resourceId: 'checklist789',
          resourceName: 'Inspección Almacén Explosivos',
          details: 'Asignación de checklist a Carlos Rodríguez',
          ipAddress: '192.168.1.101'
        },
        {
          id: '10',
          timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(), // 5 horas atrás
          userId: 'user789',
          userName: 'Carlos Rodríguez',
          action: 'logout',
          resourceType: 'user',
          resourceId: 'user789',
          resourceName: 'Carlos Rodríguez',
          details: 'Cierre de sesión',
          ipAddress: '192.168.1.102'
        }
      ];
      
      setLogs(sampleLogs);
      setLoading(false);
    }, 800);
  }, [user]);

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    // TODO: Implementar integración con backend para exportar logs
    console.log(`Exportando logs en formato ${format}`);
    // Simulación de descarga
    alert(`Los logs han sido exportados en formato ${format}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error de acceso</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Registro de Auditoría</h1>
          <p className="text-gray-600">
            Monitorea todas las actividades realizadas en el sistema para garantizar la seguridad y el cumplimiento.
          </p>
        </div>

        <AuditLogViewer 
          initialLogs={logs} 
          onExport={handleExport} 
        />
      </div>
    </div>
  );
};