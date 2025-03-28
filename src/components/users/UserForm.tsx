import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, subAdminUsers, operationalUsers } from "../../data/usersData";
import { getAllJobPositions } from "../../data/jobPositionsData";

interface UserFormProps {
  mode: "create" | "edit";
}

const UserForm: React.FC<UserFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [loading, setLoading] = useState(true);
  const [jobPositions, setJobPositions] = useState(getAllJobPositions());

  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    role: string;
    status: string;
    jobPositionId: string;
    password?: string;
    confirmPassword?: string;
  }>({
    fullName: "",
    email: "",
    role: "operational",
    status: "active",
    jobPositionId: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    role?: string;
    jobPositionId?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  useEffect(() => {
    if (mode === "edit" && userId) {
      // Simular carga de datos desde una API
      setTimeout(() => {
        const allUsers = [...subAdminUsers, ...operationalUsers];
        const user = allUsers.find((u) => u.id === userId);

        if (user) {
          setFormData({
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            status: user.status,
            jobPositionId: user.jobPositionId || "",
            password: "",
            confirmPassword: "",
          });
        } else {
          setErrors({ general: "Usuario no encontrado" });
        }

        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [mode, userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar errores al cambiar el valor
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre es obligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato del email no es válido";
    }

    if (!formData.role) {
      newErrors.role = "El rol es obligatorio";
    }

    if (formData.role === "operational" && !formData.jobPositionId) {
      newErrors.jobPositionId =
        "El puesto de trabajo es obligatorio para usuarios operacionales";
    }

    if (mode === "create") {
      if (!formData.password) {
        newErrors.password = "La contraseña es obligatoria";
      } else if (formData.password.length < 8) {
        newErrors.password = "La contraseña debe tener al menos 8 caracteres";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    } else if (formData.password && formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (
      formData.password &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Simular envío de datos a una API
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Redirigir a la lista de usuarios después de guardar
      navigate("/admin/users");
    }, 1000);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  return (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <h2 className='text-xl font-semibold text-gray-800 mb-6'>
        {mode === "create" ? "Crear Nuevo Usuario" : "Editar Usuario"}
      </h2>

      {errors.general && (
        <div className='mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md'>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Nombre Completo *
            </label>
            <input
              type='text'
              id='fullName'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.fullName && (
              <p className='mt-1 text-sm text-red-600'>{errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Email *
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.email && (
              <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='role'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Rol *
            </label>
            <select
              id='role'
              name='role'
              value={formData.role}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.role ? "border-red-500" : "border-gray-300"
              } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value='admin'>Administrador</option>
              <option value='contract_admin'>Administrador de Contrato</option>
              <option value='preventionist'>Prevencionista</option>
              <option value='supervisor'>Supervisor</option>
              <option value='operational'>Operacional</option>
            </select>
            {errors.role && (
              <p className='mt-1 text-sm text-red-600'>{errors.role}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='status'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Estado
            </label>
            <select
              id='status'
              name='status'
              value={formData.status}
              onChange={handleChange}
              className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='active'>Activo</option>
              <option value='inactive'>Inactivo</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='jobPositionId'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Puesto de Trabajo {formData.role === "operational" && "*"}
            </label>
            <select
              id='jobPositionId'
              name='jobPositionId'
              value={formData.jobPositionId}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.jobPositionId ? "border-red-500" : "border-gray-300"
              } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              disabled={
                formData.role !== "operational" &&
                formData.role !== "supervisor"
              }
            >
              <option value=''>Seleccionar puesto de trabajo</option>
              {jobPositions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
            {errors.jobPositionId && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.jobPositionId}
              </p>
            )}
          </div>

          {(mode === "create" || formData.password) && (
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Contraseña {mode === "create" && "*"}
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.password && (
                <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
              )}
            </div>
          )}

          {(mode === "create" || formData.password) && (
            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Confirmar Contraseña {mode === "create" && "*"}
              </label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.confirmPassword && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}
        </div>

        <div className='flex justify-end space-x-3'>
          <button
            type='button'
            onClick={() => navigate("/admin/users")}
            className='px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Cancelar
          </button>
          <button
            type='submit'
            className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            {mode === "create" ? "Crear Usuario" : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
