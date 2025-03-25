import { useState } from 'react';

interface DashboardMetrics {
  pendingChecklists: number;
  completedChecklists: number;
  criticalAlerts: number;
  safetyScore: number;
}

interface RecentActivity {
  id: string;
  type: 'checklist' | 'alert' | 'report';
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'critical';
}

export const DashboardPage = () => {
  // TODO: Implementar integración con backend
  const [metrics] = useState<DashboardMetrics>({
    pendingChecklists: 15,
    completedChecklists: 45,
    criticalAlerts: 3,
    safetyScore: 85
  });

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'checklist',
      description: 'Inspección diaria de camión minero #123',
      timestamp: '2024-01-20T08:30:00',
      status: 'completed'
    },
    {
      id: '2',
      type: 'alert',
      description: 'Alerta crítica en manejo de explosivos',
      timestamp: '2024-01-20T09:15:00',
      status: 'critical'
    },
    {
      id: '3',
      type: 'checklist',
      description: 'Checklist de perforación Zona Norte',
      timestamp: '2024-01-20T10:00:00',
      status: 'pending'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Checklists Pendientes</h3>
            <p className="text-3xl font-bold text-blue-600">{metrics.pendingChecklists}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Checklists Completados</h3>
            <p className="text-3xl font-bold text-green-600">{metrics.completedChecklists}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Alertas Críticas</h3>
            <p className="text-3xl font-bold text-red-600">{metrics.criticalAlerts}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Índice de Seguridad</h3>
            <p className="text-3xl font-bold text-indigo-600">{metrics.safetyScore}%</p>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Actividad Reciente</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activity.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : activity.status === 'critical'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};