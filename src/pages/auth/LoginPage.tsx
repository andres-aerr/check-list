import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

interface QuickAccessCard {
  role: string;
  label: string;
  email: string;
  password: string;
  color: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  
  // Credenciales predefinidas para cada rol
  const quickAccessCards: QuickAccessCard[] = [
    {
      role: 'admin',
      label: 'Administrador',
      email: 'admin@minera.com',
      password: 'admin123',
      color: 'bg-red-500'
    },
    {
      role: 'contract_admin',
      label: 'Sub Administrador',
      email: 'subadmin@minera.com',
      password: 'subadmin123',
      color: 'bg-purple-500'
    },
    {
      role: 'operational',
      label: 'Usuario',
      email: 'usuario@minera.com',
      password: 'usuario123',
      color: 'bg-green-500'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Buscar la tarjeta que coincide con el email para obtener el rol
    const userCard = quickAccessCards.find(card => card.email === formData.email);
    
    if (userCard) {
      // Autenticar al usuario con el rol correspondiente
      login(formData.email, formData.password, userCard.role as any);
      
      // Redirigir según el rol
      redirectBasedOnRole(userCard.role);
    } else {
      // Si no se encuentra una tarjeta, podría ser un usuario personalizado
      // En una aplicación real, aquí se verificaría con el backend
      console.error('Usuario no encontrado');
    }
  };
  
  const handleQuickAccess = (card: QuickAccessCard) => {
    setFormData({
      email: card.email,
      password: card.password
    });
    
    // Autenticar al usuario con el rol de la tarjeta
    login(card.email, card.password, card.role as any);
    
    // Redirigir según el rol
    redirectBasedOnRole(card.role);
  };
  
  // Función para redirigir según el rol
  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case 'admin':
        navigate('/users'); // Los administradores van a la gestión de usuarios
        break;
      case 'contract_admin':
        navigate('/checklists'); // Los administradores de contrato van a los checklists
        break;
      case 'preventionist':
        navigate('/reports'); // Los prevencionistas van a los reportes
        break;
      case 'supervisor':
      case 'operational':
      default:
        navigate('/dashboard'); // Los demás roles van al dashboard general
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Utiliza alguna de las siguientes credenciales para acceder
          </p>
          
          {/* Guía de credenciales */}
          <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-md font-medium text-gray-900 mb-2">Credenciales disponibles:</h3>
            <ul className="space-y-2 text-sm">
              <li className="p-2 bg-red-50 rounded border-l-4 border-red-500">
                <span className="font-bold block">Administrador:</span>
                <span className="block">Email: admin@minera.com</span>
                <span className="block">Contraseña: admin123</span>
                <span className="text-xs text-gray-600 mt-1">Acceso completo al sistema. Puede gestionar usuarios, checklists y ver todos los reportes.</span>
              </li>
              <li className="p-2 bg-purple-50 rounded border-l-4 border-purple-500">
                <span className="font-bold block">Sub Administrador:</span>
                <span className="block">Email: subadmin@minera.com</span>
                <span className="block">Contraseña: subadmin123</span>
                <span className="text-xs text-gray-600 mt-1">Puede gestionar checklists y ver reportes, pero no puede administrar usuarios.</span>
              </li>
              <li className="p-2 bg-green-50 rounded border-l-4 border-green-500">
                <span className="font-bold block">Usuario:</span>
                <span className="block">Email: usuario@minera.com</span>
                <span className="block">Contraseña: usuario123</span>
                <span className="text-xs text-gray-600 mt-1">Acceso básico. Puede completar checklists asignados y ver el dashboard.</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Tarjetas de acceso rápido - Eliminadas */}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Correo Electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};