import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { SystemConfigManager } from '../../components/admin/SystemConfigManager';

interface SystemConfig {
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    reminderFrequency: 'daily' | 'weekly' | 'never';
    notifyOnChecklistAssignment: boolean;
    notifyOnChecklistCompletion: boolean;
    notifyOnDueDate: boolean;
  };
  security: {
    passwordExpiryDays: number;
    sessionTimeoutMinutes: number;
    twoFactorAuth: boolean;
    loginAttempts: number;
    dataEncryption: boolean;
  };
  backup: {
    autoBackup: boolean;
    backupFrequency: 'daily' | 'weekly' | 'monthly';
    backupTime: string;
    retentionPeriodDays: number;
    includeAttachments: boolean;
  };
  system: {
    maintenanceMode: boolean;
    maintenanceMessage: string;
    systemLanguage: 'es' | 'en';
    dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
    timeFormat: '12h' | '24h';
    timezone: string;
  };
}

export const SystemConfigPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<SystemConfig>({
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      reminderFrequency: 'daily',
      notifyOnChecklistAssignment: true,
      notifyOnChecklistCompletion: true,
      notifyOnDueDate: true
    },
    security: {
      passwordExpiryDays: 90,
      sessionTimeoutMinutes: 30,
      twoFactorAuth: false,
      loginAttempts: 5,
      dataEncryption: true
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      backupTime: '02:00',
      retentionPeriodDays: 30,
      includeAttachments: true
    },
    system: {
      maintenanceMode: false,
      maintenanceMessage: 'El sistema se encuentra en mantenimiento. Por favor, intente más tarde.',
      systemLanguage: 'es',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      timezone: 'America/Santiago'
    }
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Verificar si el usuario tiene permisos para acceder a la configuración del sistema
    if (user && user.role !== 'admin') {
      setError('No tienes permisos para acceder a la configuración del sistema');
      setLoading(false);
      return;
    }

    // TODO: Implementar integración con backend para cargar la configuración actual
    // Simulación de carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [user]);

  const handleSaveConfig = (updatedConfig: SystemConfig) => {
    // TODO: Implementar integración con backend para guardar la configuración
    // Simulación de guardado
    setConfig(updatedConfig);
    setSaveSuccess(true);
    
    // Ocultar mensaje de éxito después de 3 segundos
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error de acceso</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración del Sistema</h1>
          <p className="text-gray-600">
            Administra la configuración global del sistema, seguridad, notificaciones y respaldos.
          </p>
        </div>

        {saveSuccess && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">La configuración se ha guardado correctamente.</span>
          </div>
        )}

        <SystemConfigManager 
          initialConfig={config} 
          onSave={handleSaveConfig} 
        />
      </div>
    </div>
  );
};