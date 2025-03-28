import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface ChecklistFormProps {
  onSubmit: (data: ChecklistFormData) => void;
  onCancel: () => void;
  initialData?: Partial<ChecklistFormData>;
  isEditing?: boolean;
}

export interface ChecklistFormData {
  title: string;
  type:
    | "equipment"
    | "mining"
    | "explosives"
    | "transport"
    | "maintenance"
    | "emergency";
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
  isEditing = false,
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ChecklistFormData>({
    title: initialData?.title || "",
    type: initialData?.type || "equipment",
    assignedTo: initialData?.assignedTo || "",
    dueDate:
      initialData?.dueDate ||
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    description: initialData?.description || "",
    items: initialData?.items || [
      { id: "1", description: "", required: true, hasEvidence: false },
    ],
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ChecklistFormData, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Si el campo que cambia es el tipo, sugerir ítems predeterminados según el tipo
    if (name === "type" && value !== formData.type) {
      const defaultItems = getDefaultItemsByType(
        value as ChecklistFormData["type"]
      );

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        items:
          prev.items.length <= 1 && !prev.items[0].description.trim()
            ? defaultItems
            : prev.items,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Limpiar error cuando el usuario corrige el campo
    if (errors[name as keyof ChecklistFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Función para obtener ítems predeterminados según el tipo de checklist
  const getDefaultItemsByType = (
    type: ChecklistFormData["type"]
  ): ChecklistItemData[] => {
    switch (type) {
      case "equipment":
        return [
          {
            id: `${Date.now()}-1`,
            description: "Verificar nivel de aceite y fluidos hidráulicos",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-2`,
            description: "Comprobar presión y estado de neumáticos",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-3`,
            description: "Revisar sistema de frenos principal y de emergencia",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-4`,
            description: "Verificar luces, señalización y alarmas de retroceso",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-5`,
            description: "Inspeccionar sistema de dirección y suspensión",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-6`,
            description: "Comprobar funcionamiento de cinturón de seguridad",
            required: true,
            hasEvidence: false,
          },
          {
            id: `${Date.now()}-7`,
            description: "Verificar estado de cabina y visibilidad de espejos",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-8`,
            description: "Revisar extintores y equipos de emergencia",
            required: true,
            hasEvidence: true,
          },
        ];
      case "mining":
        return [
          {
            id: `${Date.now()}-1`,
            description:
              "Verificar equipo de protección personal completo (casco, lentes, guantes, protección auditiva)",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-2`,
            description: "Comprobar estabilidad del terreno y fortificación",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-3`,
            description: "Revisar equipo de perforación y accesorios",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-4`,
            description: "Verificar sistema de ventilación y calidad del aire",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-5`,
            description:
              "Inspeccionar sistema de iluminación en área de trabajo",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-6`,
            description:
              "Comprobar señalización de seguridad y rutas de evacuación",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-7`,
            description:
              "Verificar disponibilidad y estado de equipos de rescate",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-8`,
            description: "Revisar sistema de comunicación y alarmas",
            required: true,
            hasEvidence: false,
          },
          {
            id: `${Date.now()}-9`,
            description: "Comprobar drenaje y control de agua en la zona",
            required: true,
            hasEvidence: true,
          },
        ];
      case "explosives":
        return [
          {
            id: `${Date.now()}-1`,
            description:
              "Verificar sistema de seguridad y control de acceso al polvorín",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-2`,
            description:
              "Comprobar inventario y registro actualizado de explosivos",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-3`,
            description: "Revisar señalización de seguridad y advertencia",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-4`,
            description:
              "Verificar sistema contra incendios y extintores especiales",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-5`,
            description:
              "Inspeccionar estado de detonadores y cordones detonantes",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-6`,
            description:
              "Comprobar condiciones de temperatura y humedad del almacén",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-7`,
            description:
              "Verificar equipos de protección personal específicos para manejo de explosivos",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-8`,
            description: "Revisar procedimientos de emergencia y evacuación",
            required: true,
            hasEvidence: false,
          },
          {
            id: `${Date.now()}-9`,
            description:
              "Comprobar sistema de pararrayos y protección eléctrica",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-10`,
            description:
              "Verificar separación adecuada entre diferentes tipos de explosivos",
            required: true,
            hasEvidence: true,
          },
        ];
      case "transport":
        return [
          {
            id: `${Date.now()}-1`,
            description:
              "Verificar documentación del vehículo y licencia del conductor",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-2`,
            description: "Comprobar sistema de comunicación y GPS",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-3`,
            description: "Revisar kit de emergencia y primeros auxilios",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-4`,
            description: "Verificar estado y sujeción de la carga",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-5`,
            description: "Inspeccionar sistema de frenos y dirección",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-6`,
            description: "Comprobar nivel de combustible y fluidos",
            required: true,
            hasEvidence: false,
          },
          {
            id: `${Date.now()}-7`,
            description: "Verificar estado de neumáticos y presión",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-8`,
            description: "Revisar luces, señalización y alarmas",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-9`,
            description:
              "Comprobar cinturones de seguridad y elementos de protección",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-10`,
            description: "Verificar ruta planificada y condiciones del camino",
            required: true,
            hasEvidence: false,
          },
        ];
      case "maintenance":
        return [
          {
            id: `${Date.now()}-1`,
            description:
              "Verificar herramientas de trabajo y estado de calibración",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-2`,
            description:
              "Comprobar equipos de protección personal específicos para mantenimiento",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-3`,
            description:
              "Revisar procedimientos y manuales de mantenimiento actualizados",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-4`,
            description: "Verificar repuestos disponibles y su almacenamiento",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-5`,
            description: "Inspeccionar área de trabajo y señalización",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-6`,
            description: "Comprobar bloqueo y etiquetado de equipos (LOTO)",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-7`,
            description: "Verificar sistemas eléctricos y aislamiento",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-8`,
            description: "Revisar equipos de elevación y soporte",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-9`,
            description: "Comprobar sistemas hidráulicos y neumáticos",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-10`,
            description: "Verificar disponibilidad de equipos de emergencia",
            required: true,
            hasEvidence: true,
          },
        ];
      case "emergency":
        return [
          {
            id: `${Date.now()}-1`,
            description:
              "Verificar rutas de evacuación y que estén libres de obstáculos",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-2`,
            description:
              "Comprobar equipos de primeros auxilios y su fecha de vencimiento",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-3`,
            description:
              "Revisar sistema de alarma y realizar prueba de funcionamiento",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-4`,
            description: "Verificar puntos de encuentro y su señalización",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-5`,
            description: "Inspeccionar extintores y su fecha de recarga",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-6`,
            description: "Comprobar funcionamiento de luces de emergencia",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-7`,
            description:
              "Verificar disponibilidad de equipos de respiración autónoma",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-8`,
            description: "Revisar procedimientos de emergencia actualizados",
            required: true,
            hasEvidence: false,
          },
          {
            id: `${Date.now()}-9`,
            description: "Comprobar sistema de comunicación de emergencia",
            required: true,
            hasEvidence: true,
          },
          {
            id: `${Date.now()}-10`,
            description:
              "Verificar disponibilidad de camillas y equipos de rescate",
            required: true,
            hasEvidence: true,
          },
        ];
      default:
        return [
          { id: "1", description: "", required: true, hasEvidence: false },
        ];
    }
  };

  const handleItemChange = (
    index: number,
    field: keyof ChecklistItemData,
    value: string | boolean
  ) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `${Date.now()}`,
          description: "",
          required: true,
          hasEvidence: false,
        },
      ],
    }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length <= 1) {
      return; // Mantener al menos un ítem
    }

    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ChecklistFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es obligatorio";
    }

    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = "Debe asignar el checklist a alguien";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "La fecha de vencimiento es obligatoria";
    }

    // Validar que todos los ítems tengan descripción
    const hasEmptyItems = formData.items.some(
      (item) => !item.description.trim()
    );
    if (hasEmptyItems) {
      newErrors.items = "Todos los ítems deben tener una descripción";
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
    { value: "equipment", label: "Equipos" },
    { value: "mining", label: "Minería" },
    { value: "explosives", label: "Explosivos" },
    { value: "transport", label: "Transporte" },
    { value: "maintenance", label: "Mantenimiento" },
    { value: "emergency", label: "Emergencia" },
  ];

  return (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <h2 className='text-2xl font-bold mb-6'>
        {isEditing ? "Editar Checklist" : "Crear Nuevo Checklist"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          {/* Título */}
          <div className='col-span-2'>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Título *
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder='Ej: Inspección Camión Minero #456'
            />
            {errors.title && (
              <p className='mt-1 text-sm text-red-500'>{errors.title}</p>
            )}
          </div>

          {/* Tipo */}
          <div>
            <label
              htmlFor='type'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Tipo de Checklist *
            </label>
            <select
              id='type'
              name='type'
              value={formData.type}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Asignado a */}
          <div>
            <label
              htmlFor='assignedTo'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Asignado a *
            </label>
            <input
              type='text'
              id='assignedTo'
              name='assignedTo'
              value={formData.assignedTo}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.assignedTo ? "border-red-500" : "border-gray-300"
              }`}
              placeholder='Nombre del responsable'
            />
            {errors.assignedTo && (
              <p className='mt-1 text-sm text-red-500'>{errors.assignedTo}</p>
            )}
          </div>

          {/* Fecha de vencimiento */}
          <div>
            <label
              htmlFor='dueDate'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Fecha de vencimiento *
            </label>
            <input
              type='date'
              id='dueDate'
              name='dueDate'
              value={formData.dueDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.dueDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dueDate && (
              <p className='mt-1 text-sm text-red-500'>{errors.dueDate}</p>
            )}
          </div>

          {/* Descripción */}
          <div className='col-span-2'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Descripción
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
              placeholder='Descripción detallada del checklist'
            />
          </div>
        </div>

        {/* Ítems del checklist */}
        <div className='mb-6'>
          <div className='flex justify-between items-center mb-3'>
            <h3 className='text-lg font-medium'>Ítems del Checklist</h3>
            <button
              type='button'
              onClick={addItem}
              className='px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200'
            >
              + Agregar Ítem
            </button>
          </div>

          {errors.items && (
            <p className='mb-3 text-sm text-red-500'>{errors.items}</p>
          )}

          <div className='space-y-4'>
            {formData.items.map((item, index) => (
              <div
                key={item.id}
                className='p-4 border border-gray-200 rounded-md'
              >
                <div className='flex justify-between mb-2'>
                  <h4 className='font-medium'>Ítem {index + 1}</h4>
                  <button
                    type='button'
                    onClick={() => removeItem(index)}
                    className='text-red-500 hover:text-red-700'
                    disabled={formData.items.length <= 1}
                  >
                    Eliminar
                  </button>
                </div>

                <div className='mb-3'>
                  <label
                    htmlFor={`item-${index}-description`}
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Descripción *
                  </label>
                  <input
                    type='text'
                    id={`item-${index}-description`}
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    placeholder='Descripción del ítem'
                  />
                </div>

                <div className='flex space-x-4'>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      id={`item-${index}-required`}
                      checked={item.required}
                      onChange={(e) =>
                        handleItemChange(index, "required", e.target.checked)
                      }
                      className='h-4 w-4 text-blue-600 border-gray-300 rounded'
                    />
                    <label
                      htmlFor={`item-${index}-required`}
                      className='ml-2 text-sm text-gray-700'
                    >
                      Obligatorio
                    </label>
                  </div>

                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      id={`item-${index}-evidence`}
                      checked={item.hasEvidence}
                      onChange={(e) =>
                        handleItemChange(index, "hasEvidence", e.target.checked)
                      }
                      className='h-4 w-4 text-blue-600 border-gray-300 rounded'
                    />
                    <label
                      htmlFor={`item-${index}-evidence`}
                      className='ml-2 text-sm text-gray-700'
                    >
                      Requiere evidencia
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex justify-end space-x-3'>
          <button
            type='button'
            onClick={onCancel}
            className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
          >
            Cancelar
          </button>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          >
            {isEditing ? "Guardar Cambios" : "Crear Checklist"}
          </button>
        </div>
      </form>
    </div>
  );
};
