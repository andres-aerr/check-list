import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChecklistItemProgress } from '../../components/checklists/ChecklistItemProgress';
import { useAuth } from '../../contexts/AuthContext';

interface ChecklistItemDetail {
  id: string;
  description: string;
  required: boolean;
  hasEvidence: boolean;
  completed?: boolean;
  evidence?: string;
  notes?: string;
}

interface Checklist {
  id: string;
  title: string;
  type: 'equipment' | 'mining' | 'explosives' | 'transport' | 'maintenance' | 'emergency';
  status: 'pending' | 'completed' | 'in_progress';
  assignedTo: string;
  dueDate: string;
  createdAt: string;
  description?: string;
  items: ChecklistItemDetail[];
}

export const ChecklistProgressPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Verificar si el usuario tiene permisos para completar checklists
    if (user && !['admin', 'contract_admin', 'preventionist', 'supervisor', 'operational'].includes(user.role)) {
      setError('No tienes permisos para completar checklists');
      setLoading(false);
      return;
    }

    // TODO: Implementar integración con backend
    // Simulación de carga de datos
    setTimeout(() => {
      if (id === '1') {
        setChecklist({
          id: '1',
          title: 'Inspección Camión Minero #456',
          type: 'equipment',
          status: 'in_progress',
          assignedTo: 'Juan Pérez',
          dueDate: '2024-01-21',
          createdAt: '2024-01-20',
          description: 'Inspección de seguridad del camión minero antes de iniciar operaciones en la zona norte.',
          items: [
            {
              id: '101',
              description: 'Verificar nivel de aceite',
              required: true,
              hasEvidence: false,
              completed: false
            },
            {
              id: '102',
              description: 'Comprobar presión de neumáticos',
              required: true,
              hasEvidence: true,
              completed: false
            },
            {
              id: '103',
              description: 'Revisar sistema de frenos',
              required: true,
              hasEvidence: true,
              completed: false
            },
            {
              id: '104',
              description: 'Verificar luces y señalización',
              required: false,
              hasEvidence: true,
              completed: false
            }
          ]
        });
      } else if (id === '2') {
        setChecklist({
          id: '2',
          title: 'Checklist Perforación Zona Sur',
          type: 'mining',
          status: 'in_progress',
          assignedTo: 'María González',
          dueDate: '2024-01-21',
          createdAt: '2024-01-20',
          description: 'Verificación de seguridad para operaciones de perforación en la zona sur del yacimiento.',
          items: [
            {
              id: '201',
              description: 'Verificar equipo de protección personal',
              required: true,
              hasEvidence: true,
              completed: true,
              evidence: 'https://via.placeholder.com/150'
            },
            {
              id: '202',
              description: 'Comprobar estabilidad del terreno',
              required: true,
              hasEvidence: true,
              completed: false
            },
            {
              id: '203',
              description: 'Revisar equipo de perforación',
              required: true,
              hasEvidence: false,
              completed: true,
              notes: 'Equipo en buen estado, se realizó mantenimiento preventivo la semana pasada.'
            },
            {
              id: '204',
              description: 'Verificar sistema de ventilación',
              required: false,
              hasEvidence: true,
              completed: false
            }
          ]
        });
      } else {
        setError('Checklist no encontrado');
      }
      setLoading(false);
    }, 1000);
  }, [id, user]);

  const handleUpdateItem = (itemId: string, updates: Partial<ChecklistItemDetail>) => {
    if (!checklist) return;

    const updatedItems = checklist.items.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    );

    setChecklist({
      ...checklist,
      items: updatedItems
    });

    // Simular guardado automático
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 500);
  };

  const handleCompleteChecklist = () => {
    if (!checklist) return;

    // Verificar si todos los ítems requeridos están completados
    const requiredItems = checklist.items.filter(item => item.required);
    const allRequiredCompleted = requiredItems.every(item => item.completed);

    if (!allRequiredCompleted) {
      alert('Debes completar todos los ítems obligatorios antes de finalizar el checklist.');
      return;
    }

    // Verificar si todos los ítems que requieren evidencia tienen evidencia
    const evidenceItems = checklist.items.filter(item => item.hasEvidence && item.completed);
    const allEvidenceProvided = evidenceItems.every(item => item.evidence);

    if (!allEvidenceProvided) {
      alert('Debes proporcionar evidencia para todos los ítems completados que la requieren.');
      return;
    }

    // Actualizar estado del checklist
    setChecklist({
      ...checklist,
      status: 'completed'
    });

    // Simular guardado y redirección
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Checklist completado con éxito!');
      navigate('/checklists');
    }, 1000);
  };

  const getTypeLabel = (type: Checklist['type']) => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-gray-500">Cargando checklist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
          <button
            onClick={() => navigate('/checklists')}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            Volver a la lista de checklists
          </button>
        </div>
      </div>
    );
  }

  if (!checklist) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-gray-500">Checklist no encontrado</p>
          <button
            onClick={() => navigate('/checklists')}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Volver a la lista de checklists
          </button>
        </div>
      </div>
    );
  }

  const completedCount = checklist.items.filter(item => item.completed).length;
  const totalCount = checklist.items.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <button
                onClick={() => navigate('/checklists')}
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
              <h1 className="text-2xl font-bold text-gray-900">{checklist.title}</h1>
              <div className="flex items-center mt-2">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  En Progreso
                </span>
                <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {getTypeLabel(checklist.type)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Asignado a:</span> {checklist.assignedTo}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Fecha de vencimiento:</span>{' '}
                {new Date(checklist.dueDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Fecha de creación:</span>{' '}
                {new Date(checklist.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {checklist.description && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Descripción</h2>
              <p className="text-gray-700">{checklist.description}</p>
            </div>
          )}

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium">Progreso</h2>
              <span className="text-sm font-medium text-gray-700">
                {completedCount} de {totalCount} ({progressPercentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {saving && (
            <div className="mb-4 text-sm text-gray-500">Guardando cambios...</div>
          )}

          {saveSuccess && (
            <div className="mb-4 text-sm text-green-600">Cambios guardados correctamente</div>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Ítems del Checklist</h2>
          <div className="space-y-4">
            {checklist.items.map((item) => (
              <ChecklistItemProgress
                key={item.id}
                id={item.id}
                description={item.description}
                required={item.required}
                hasEvidence={item.hasEvidence}
                completed={item.completed}
                evidence={item.evidence}
                notes={item.notes}
                onUpdateItem={handleUpdateItem}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleCompleteChecklist}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Completar Checklist
          </button>
        </div>
      </div>
    </div>
  );
};