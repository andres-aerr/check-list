import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChecklistForm, ChecklistFormData } from '../../components/checklists/ChecklistForm';
import { useAuth } from '../../contexts/AuthContext';

interface ChecklistItemDetail {
  id: string;
  description: string;
  required: boolean;
  hasEvidence: boolean;
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

export const ChecklistEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si el usuario tiene permisos para editar checklists
    if (user && !['admin', 'contract_admin', 'preventionist'].includes(user.role)) {
      setError('No tienes permisos para editar checklists');
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
          status: 'pending',
          assignedTo: 'Juan Pérez',
          dueDate: '2024-01-21',
          createdAt: '2024-01-20',
          description: 'Inspección de seguridad del camión minero antes de iniciar operaciones en la zona norte.',
          items: [
            {
              id: '101',
              description: 'Verificar nivel de aceite',
              required: true,
              hasEvidence: false
            },
            {
              id: '102',
              description: 'Comprobar presión de neumáticos',
              required: true,
              hasEvidence: true
            },
            {
              id: '103',
              description: 'Revisar sistema de frenos',
              required: true,
              hasEvidence: true
            },
            {
              id: '104',
              description: 'Verificar luces y señalización',
              required: false,
              hasEvidence: true
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
              hasEvidence: true
            },
            {
              id: '202',
              description: 'Comprobar estabilidad del terreno',
              required: true,
              hasEvidence: true
            },
            {
              id: '203',
              description: 'Revisar equipo de perforación',
              required: true,
              hasEvidence: false
            },
            {
              id: '204',
              description: 'Verificar sistema de ventilación',
              required: false,
              hasEvidence: true
            }
          ]
        });
      } else if (id === '3') {
        setChecklist({
          id: '3',
          title: 'Inspección Almacén Explosivos',
          type: 'explosives',
          status: 'completed',
          assignedTo: 'Carlos Rodríguez',
          dueDate: '2024-01-20',
          createdAt: '2024-01-19',
          description: 'Inspección de seguridad del almacén de explosivos.',
          items: [
            {
              id: '301',
              description: 'Verificar sistema de seguridad',
              required: true,
              hasEvidence: true
            },
            {
              id: '302',
              description: 'Comprobar inventario de explosivos',
              required: true,
              hasEvidence: true
            },
            {
              id: '303',
              description: 'Revisar señalización de seguridad',
              required: true,
              hasEvidence: false
            },
            {
              id: '304',
              description: 'Verificar sistema contra incendios',
              required: false,
              hasEvidence: true
            }
          ]
        });
      } else {
        setError('Checklist no encontrado');
      }
      setLoading(false);
    }, 1000);
  }, [id, user]);

  const handleSubmit = (formData: ChecklistFormData) => {
    if (!checklist) return;

    // TODO: Implementar integración con backend para guardar cambios
    // Simulación de guardado
    setLoading(true);
    setTimeout(() => {
      // Actualizar checklist en la aplicación
      const updatedChecklist = {
        ...checklist,
        title: formData.title,
        type: formData.type,
        assignedTo: formData.assignedTo,
        dueDate: formData.dueDate,
        description: formData.description,
        items: formData.items.map(item => ({
          id: item.id,
          description: item.description,
          required: item.required,
          hasEvidence: item.hasEvidence
        }))
      };
      setChecklist(updatedChecklist);
      setLoading(false);
      
      // Redirigir a la lista de checklists
      navigate('/checklists');
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/checklists');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!checklist) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Aviso: </strong>
        <span className="block sm:inline">No se encontró el checklist solicitado.</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Editar Checklist</h1>
      
      <ChecklistForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialData={{
          title: checklist.title,
          type: checklist.type,
          assignedTo: checklist.assignedTo,
          dueDate: checklist.dueDate,
          description: checklist.description || '',
          items: checklist.items
        }}
        isEditing={true}
      />
    </div>
  );
};