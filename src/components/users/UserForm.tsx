import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  initialData?: Partial<UserFormData>;
  isEditing?: boolean;
}

export interface UserFormData {
  id?: string;
  fullName: string;
  email: string;
  password?: string;
  role: 'admin' | 'contract_admin' | 'preventionist' | 'supervisor' | 'operational';
  status: 'active' | 'inactive';
}

export const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<UserFormData>({
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    password: initialData?.password || '',
    role: initialData?.role || 'operational',
    status: initialData?.status || 'active'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario corrige el campo
    if (errors[name as keyof UserFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    
    if (!isEditing && !formData.password?.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (!isEditing && formData.password && formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
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

  const roleOptions = [
    { value: 'admin', label: 'Administrador General' },
    { value: 'contract_admin', label: 'Administrador de Contrato' },
    { value: 'preventionist', label: 'Prevencionista' },
    { value: 'supervisor', label: 'Supervisor/Jefatura' },
    { value: 'operational', label: 'Usuario Operacional' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' }
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Nombre Completo */}
          <div className="col-span-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ej: Juan Pérez"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
          </div>
          
          {/* Correo Electrónico */}
          <div className="col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ej: juan.perez@minera.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          
          {/* Contraseña */}
          {(!isEditing || (isEditing && formData.password)) && (
            <div className="col-span-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {isEditing ? 'Nueva Contraseña (dejar en blanco para mantener la actual)' : 'Contraseña *'}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={isEditing ? '••••••••' : 'Ingrese contraseña'}
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>
          )}
          
          {/* Rol */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Rol *
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {roleOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Estado */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Estado *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
            {isEditing ? 'Guardar Cambios' : 'Crear Usuario'}
          </button>
        </div>
      </form>
    </div>
  );
};