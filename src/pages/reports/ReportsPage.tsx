import { useState } from 'react';

interface SafetyMetrics {
  totalInspections: number;
  completionRate: number;
  criticalFindings: number;
  averageResponseTime: number;
  safetyScore: number;
  incidentsByType: {
    type: string;
    count: number;
  }[];
  monthlyTrends: {
    month: string;
    inspections: number;
    incidents: number;
  }[];
}

export const ReportsPage = () => {
  // TODO: Implementar integración con backend
  const [metrics] = useState<SafetyMetrics>({
    totalInspections: 250,
    completionRate: 92,
    criticalFindings: 15,
    averageResponseTime: 24,
    safetyScore: 85,
    incidentsByType: [
      { type: 'Equipos', count: 8 },
      { type: 'Explosivos', count: 3 },
      { type: 'Perforación', count: 2 },
      { type: 'Transporte', count: 2 }
    ],
    monthlyTrends: [
      { month: 'Ene 2024', inspections: 80, incidents: 5 },
      { month: 'Feb 2024', inspections: 85, incidents: 4 },
      { month: 'Mar 2024', inspections: 85, incidents: 6 }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reportes de Seguridad</h1>
          <div className="flex space-x-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => {
                // TODO: Implementar exportación a PDF
                console.log('Exportar a PDF');
              }}
            >
              Exportar PDF
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={() => {
                // TODO: Implementar exportación a Excel
                console.log('Exportar a Excel');
              }}
            >
              Exportar Excel
            </button>
          </div>
        </div>

        {/* Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Inspecciones</h3>
            <p className="text-3xl font-bold text-blue-600">{metrics.totalInspections}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Tasa de Cumplimiento</h3>
            <p className="text-3xl font-bold text-green-600">{metrics.completionRate}%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Hallazgos Críticos</h3>
            <p className="text-3xl font-bold text-red-600">{metrics.criticalFindings}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Tiempo Respuesta</h3>
            <p className="text-3xl font-bold text-yellow-600">{metrics.averageResponseTime}h</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Índice Seguridad</h3>
            <p className="text-3xl font-bold text-indigo-600">{metrics.safetyScore}%</p>
          </div>
        </div>

        {/* Análisis por Tipo de Incidente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Incidentes por Tipo</h3>
            <div className="space-y-4">
              {metrics.incidentsByType.map((item) => (
                <div key={item.type} className="flex items-center">
                  <span className="flex-1 text-sm font-medium text-gray-900">
                    {item.type}
                  </span>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded-full">
                      <div
                        className="h-4 bg-blue-600 rounded-full"
                        style={{
                          width: `${(item.count / metrics.criticalFindings) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                  <span className="ml-4 text-sm font-medium text-gray-900">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tendencias Mensuales */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Tendencias Mensuales</h3>
            <div className="space-y-4">
              {metrics.monthlyTrends.map((item) => (
                <div key={item.month} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <span>{item.month}</span>
                    <span>Inspecciones: {item.inspections}</span>
                    <span>Incidentes: {item.incidents}</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-green-500 rounded-full"
                        style={{
                          width: `${(item.inspections / 100) * 100}%`
                        }}
                      />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-red-500 rounded-full"
                        style={{
                          width: `${(item.incidents / 10) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};