import React, { useState, useEffect } from "react";
import { JobPosition } from "../../data/jobPositionsData";
import { useChecklistCategory } from "../../contexts/ChecklistCategoryContext";

interface JobPositionFormProps {
  onSubmit: (formData: JobPosition) => void;
  onCancel: () => void;
  initialData?: JobPosition;
}

export const JobPositionForm: React.FC<JobPositionFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const { getAllChecklists } = useChecklistCategory();
  const [formData, setFormData] = useState<JobPosition>(() => ({
    id: initialData?.id || "",
    name: initialData?.name || "",
    description: initialData?.description || "",
    operationalRole: initialData?.operationalRole || "Usuario Operacional",
    jobTitle: initialData?.jobTitle || "",
    defaultChecklists: initialData?.defaultChecklists || [],
    requiredSupervisor: initialData?.requiredSupervisor || false,
    requiredPreventionist: initialData?.requiredPreventionist || false,
    createdAt: initialData?.createdAt || new Date().toISOString(),
    updatedAt: initialData?.updatedAt || new Date().toISOString(),
  }));

  const [selectedChecklists, setSelectedChecklists] = useState<string[]>(
    initialData?.defaultChecklists || []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showChecklistSelector, setShowChecklistSelector] = useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof JobPosition, string>>
  >({});

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      updatedAt: new Date().toISOString(),
    }));

    // Limpiar error si el usuario corrige el campo
    if (errors[name as keyof JobPosition]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof JobPosition, string>> = {};

    // Validaciones
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }
    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria";
    }
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "El título del puesto es obligatorio";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Actualizar los checklists seleccionados antes de enviar
    const updatedFormData = {
      ...formData,
      defaultChecklists: selectedChecklists,
    };

    onSubmit(updatedFormData);
  };

  // Función para manejar la selección de checklists
  const handleChecklistToggle = (checklistId: string) => {
    setSelectedChecklists((prev) =>
      prev.includes(checklistId)
        ? prev.filter((id) => id !== checklistId)
        : [...prev, checklistId]
    );
  };

  // Filtrar checklists por término de búsqueda
  const allChecklists = getAllChecklists();
  const filteredChecklists = allChecklists.filter((checklist) =>
    checklist.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Nombre del Puesto
        </label>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className='mt-2 text-sm text-red-600'>{errors.name}</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Descripción
        </label>
        <textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && (
          <p className='mt-2 text-sm text-red-600'>{errors.description}</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Título del Puesto
        </label>
        <input
          type='text'
          name='jobTitle'
          value={formData.jobTitle}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.jobTitle ? "border-red-500" : ""
          }`}
        />
        {errors.jobTitle && (
          <p className='mt-2 text-sm text-red-600'>{errors.jobTitle}</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Rol Operacional
        </label>
        <select
          name='operationalRole'
          value={formData.operationalRole}
          onChange={handleChange}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
        >
          <option value='Usuario Operacional'>Usuario Operacional</option>
          <option value='Supervisor'>Supervisor</option>
          <option value='Prevencionista'>Prevencionista</option>
        </select>
      </div>

      <div className='flex items-center'>
        <input
          type='checkbox'
          id='requiredSupervisor'
          name='requiredSupervisor'
          checked={formData.requiredSupervisor}
          onChange={handleChange}
          className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
        />
        <label
          htmlFor='requiredSupervisor'
          className='ml-2 text-sm font-medium text-gray-700'
        >
          Requiere Supervisor
        </label>
      </div>

      <div className='flex items-center'>
        <input
          type='checkbox'
          id='requiredPreventionist'
          name='requiredPreventionist'
          checked={formData.requiredPreventionist}
          onChange={handleChange}
          className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
        />
        <label
          htmlFor='requiredPreventionist'
          className='ml-2 text-sm font-medium text-gray-700'
        >
          Requiere Prevencionista
        </label>
      </div>

      <div className='border-t border-gray-200 pt-4'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-medium text-gray-900'>
            Checklists Asignados
          </h3>
          <button
            type='button'
            onClick={() => setShowChecklistSelector(!showChecklistSelector)}
            className='px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            {showChecklistSelector ? "Ocultar Selector" : "Mostrar Selector"}
          </button>
        </div>

        {selectedChecklists.length > 0 ? (
          <ul className='mt-2 space-y-1 list-disc list-inside text-sm text-gray-600'>
            {selectedChecklists.map((checklistId) => {
              const checklist = allChecklists.find((c) => c.id === checklistId);
              return (
                <li
                  key={checklistId}
                  className='flex justify-between items-center'
                >
                  <span>{checklist ? checklist.title : checklistId}</span>
                  <button
                    type='button'
                    onClick={() => handleChecklistToggle(checklistId)}
                    className='text-red-600 hover:text-red-800 text-xs'
                  >
                    Eliminar
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className='text-sm text-gray-500'>
            No hay checklists asignados a este puesto.
          </p>
        )}
      </div>

      <div className='flex justify-end space-x-3'>
        <button
          type='button'
          onClick={onCancel}
          className='px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Cancelar
        </button>
        <button
          type='submit'
          className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          {initialData ? "Actualizar" : "Crear"}
        </button>
      </div>

      {/* Selector de Checklists */}
      {showChecklistSelector && (
        <div className='mt-4 border border-gray-200 rounded-md p-4'>
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Buscar checklists...'
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className='max-h-[300px] overflow-y-auto'>
            {filteredChecklists.map((checklist) => (
              <div
                key={checklist.id}
                className='flex items-start space-x-3 p-3 hover:bg-gray-50 border-b border-gray-200'
              >
                <input
                  type='checkbox'
                  id={`checklist-${checklist.id}`}
                  checked={selectedChecklists.includes(checklist.id)}
                  onChange={() => handleChecklistToggle(checklist.id)}
                  className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1'
                />
                <div className='flex-1'>
                  <label
                    htmlFor={`checklist-${checklist.id}`}
                    className='text-sm font-medium text-gray-900 block cursor-pointer'
                  >
                    {checklist.title}
                  </label>
                  <span className='text-xs text-gray-500'>
                    {checklist.type === "equipment"
                      ? "Equipamiento"
                      : checklist.type === "mining"
                      ? "Minería"
                      : checklist.type === "safety"
                      ? "Seguridad"
                      : checklist.type === "explosives"
                      ? "Explosivos"
                      : checklist.type === "transport"
                      ? "Transporte"
                      : checklist.type === "maintenance"
                      ? "Mantenimiento"
                      : checklist.type === "emergency"
                      ? "Emergencia"
                      : "General"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
};
