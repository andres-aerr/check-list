import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ChecklistFormProps {
  onSubmit: (data: ChecklistFormData) => void;
  onCancel: () => void;
  initialData?: Partial<ChecklistFormData>;
  isEditing?: boolean;
}

export interface ChecklistFormData {
  title: string;
  type: 'equipment' | 'mining' | 'explosives' | 'transport' | 'maintenance' | 'emergency';
  assignedTo: string;
  dueDate: string;
  description: string;
  items: ChecklistItemData[];
}

export interface ChecklistItemData {
  id: string;
  description: string;
  required: boolean;
  hasEvidence: boolean;
}

export const ChecklistForm: React.FC<ChecklistFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ChecklistFormData>({
    title: initialData?.title || '',
    type: initialData?.type || 'equipment',
    assignedTo: initialData?.assignedTo || '',
    dueDate: initialData?.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: initialData?.description || '',
    items: initialData?.items || [
      { id: '1', description: '', required: true, hasEvidence: false }
    ]
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ChecklistFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario corrige el campo
    if (errors[name as keyof ChecklistFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleItemChange = (index: number, field: keyof ChecklistItemData, value: string | boolean) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { id: `${Date.now()}`, description: '', required: true, hasEvidence: false }
      ]
    }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length <= 1) {
      return; // Mantener al menos un ítem
    }
    
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ChecklistFormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }
    
    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = 'Debe asignar el checklist a alguien';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'La fecha de vencimiento es obligatoria';
    }
    
    // Validar que todos los ítems tengan descripción
    const hasEmptyItems = formData.items.some(item => !item.description.trim());
    if (hasEmptyItems) {
      newErrors.items = 'Todos los ítems deben tener una descripción';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const typeOptions = [
    { value: 'equipment', label: 'Equipos' },
    { value: 'mining', label: 'Minería' },
    { value: 'explosives', label: 'Explosivos' },
    { value: 'transport', label: 'Transporte' },
    { value: 'maintenance', label: 'Mantenimiento' },
    { value: 'emergency', label: 'Emergencia' }
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? 'Editar Checklist' : 'Crear Nuevo Checklist'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Título */}
          <div className="col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ej: Inspección Camión Minero #456"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>
          
          {/* Tipo */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Checklist *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {typeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Asignado a */}
          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
              Asignado a *
            </label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.assignedTo ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Nombre del responsable"
            />
            {errors.assignedTo && <p className="mt-1 text-sm text-red-500">{errors.assignedTo}</p>}
          </div>
          
          {/* Fecha de vencimiento */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de vencimiento *
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.dueDate ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.dueDate && <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>}
          </div>
          
          {/* Descripción */}
          <div className="col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Descripción detallada del checklist"
            />
          </div>
        </div>
        
        {/* Ítems del checklist */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Ítems del Checklist</h3>
            <button
              type="button"
              onClick={addItem}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              + Agregar Ítem
            </button>
          </div>
          
          {errors.items && <p className="mb-3 text-sm text-red-500">{errors.items}</p>}
          
          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">Ítem {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700"
                    disabled={formData.items.length <= 1}
                  >
                    Eliminar
                  </button>
                </div>
                
                <div className="mb-3">
                  <label htmlFor={`item-${index}-description`} className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción *
                  </label>
                  <input
                    type="text"
                    id={`item-${index}-description`}
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Descripción del ítem"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`item-${index}-required`}
                      checked={item.required}
                      onChange={(e) => handleItemChange(index, 'required', e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor={`item-${index}-required`} className="ml-2 text-sm text-gray-700">
                      Obligatorio
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`item-${index}-evidence`}
                      checked={item.hasEvidence}
                      onChange={(e) => handleItemChange(index, 'hasEvidence', e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor={`item-${index}-evidence`} className="ml-2 text-sm text-gray-700">
                      Requiere evidencia
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isEditing ? 'Guardar Cambios' : 'Crear Checklist'}
          </button>
        </div>
      </form>
    </div>
  );
};