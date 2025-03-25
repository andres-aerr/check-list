import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface SystemConfigManagerProps {
  onSave: (config: SystemConfig) => void;
  initialConfig: SystemConfig;
}

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

export const SystemConfigManager: React.FC<SystemConfigManagerProps> = ({
  onSave,
  initialConfig
}) => {
  const { user } = useAuth();
  const [config, setConfig] = useState<SystemConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState<'notifications' | 'security' | 'backup' | 'system'>('notifications');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Verificar si el usuario tiene permisos de administrador
  if (user?.role !== 'admin') {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-center text-red-500">
          <p>No tienes permisos para acceder a esta sección.</p>
        </div>
      </div>
    );
  }

  const handleChange = (section: keyof SystemConfig, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simular guardado
    setTimeout(() => {
      onSave(config);
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Configuración del Sistema</h2>
      
      {/* Tabs de navegación */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'notifications' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Notificaciones
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'security' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Seguridad
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'backup' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Respaldo
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'system' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Sistema
          </button>
        </nav>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Configuración de Notificaciones */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Configuración de Notificaciones</h3>
            <p className="text-sm text-gray-500 mb-4">
              Configura cómo y cuándo se envían las notificaciones a los usuarios del sistema.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="emailNotifications" className="block text-sm font-medium text-gray-700">
                    Notificaciones por correo electrónico
                  </label>
                  <p className="text-xs text-gray-500">Enviar notificaciones por correo electrónico a los usuarios</p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={config.notifications.emailNotifications}
                    onChange={(e) => handleChange('notifications', 'emailNotifications', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="pushNotifications" className="block text-sm font-medium text-gray-700">
                    Notificaciones push
                  </label>
                  <p className="text-xs text-gray-500">Enviar notificaciones push a dispositivos móviles</p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    id="pushNotifications"
                    checked={config.notifications.pushNotifications}
                    onChange={(e) => handleChange('notifications', 'pushNotifications', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="reminderFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                  Frecuencia de recordatorios
                </label>
                <select
                  id="reminderFrequency"
                  value={config.notifications.reminderFrequency}
                  onChange={(e) => handleChange('notifications', 'reminderFrequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="never">Nunca</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="notifyOnChecklistAssignment" className="block text-sm font-medium text-gray-700">
                    Notificar al asignar checklist
                  </label>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    id="notifyOnChecklistAssignment"
                    checked={config.notifications.notifyOnChecklistAssignment}
                    onChange={(e) => handleChange('notifications', 'notifyOnChecklistAssignment', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="notifyOnChecklistCompletion" className="block text-sm font-medium text-gray-700">
                    Notificar al completar checklist
                  </label>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    id="notifyOnChecklistCompletion"
                    checked={config.notifications.notifyOnChecklistCompletion}
                    onChange={(e) => handleChange('notifications', 'notifyOnChecklistCompletion', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="notifyOnDueDate" className="block text-sm font-medium text-gray-700">
                    Notificar fechas de vencimiento
                  </label>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    id="notifyOnDueDate"
                    checked={config.notifications.notifyOnDueDate}
                    onChange={(e) => handleChange('notifications', 'notifyOnDueDate', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Configuración de Seguridad */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Configuración de Seguridad</h3>
            <p className="text-sm text-gray-500 mb-4">
              Configura los parámetros de seguridad del sistema.
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="passwordExpiryDays" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiración de contraseña (días)
                </label>
                <input
                  type="number"
                  id="passwordExpiryDays"
                  min="0"
                  max="365"
                  value={config.security.passwordExpiryDays}
                  onChange={(e) => handleChange('security', 'passwordExpiryDays', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">0 = nunca expira</p>
              </div>
              
              <div>
                <label htmlFor="sessionTimeoutMinutes" className="block text-sm font-medium text-gray-700 mb-1">
                  Tiempo de inactividad de sesión (minutos)
                </label>
                <input
                  type="number"
                  id="sessionTimeoutMinutes"
                  min="1"
                  max="1440"
                  value={config.security.sessionTimeoutMinutes}
                  onChange={(e) => handleChange('security', 'sessionTimeoutMinutes', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="twoFactorAuth" className="block text-sm font-medium text-gray-700">
                    Autenticación de dos factores
                  </label>
                  <p className="text-xs text-gray-500">Requerir verificación adicional al iniciar sesión</p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    id="twoFactorAuth"
                    checked={config.security.twoFactorAuth}
                    onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="loginAttempts" className="block text-sm font-medium text-gray-700 mb-1">
                  Intentos de inicio de sesión antes de bloqueo
                </label>
                <input
                  type="number"
                  id="loginAttempts"
                  min="1"
                  max="10"
                  value={config.security.loginAttempts}
                  onChange={(e) => handleChange('security', 'loginAttempts', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="dataEncryption" className="block text-sm font-medium text-gray-700">
                    Cifrado de datos
                  </label>
                  <p className="text-xs text-gray-500">Cifrar datos sensibles almacenados en el sistema</p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    id="dataEncryption"
                    checked={config.security.dataEncryption}
                    onChange={(e) => handleChange('security', 'dataEncryption', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Configuración de Respaldo */}
        {activeTab === 'backup' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Configuración de Respaldo</h3>
            <p className="text-sm text-gray-500 mb-4">
              Configura cómo y cuándo se realizan los respaldos automáticos del sistema.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="autoBackup" className="block text-sm font-medium text-gray-700">
                    Respaldo automático
                  </label>
                  <p className="text-xs text-gray-500">Realizar respaldos automáticos del sistema</p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    id="autoBackup"
                    checked={config.backup.autoBackup}
                    onChange={(e) => handleChange('backup', 'autoBackup', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="backupFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                  Frecuencia de respaldo
                </label>
                <select
                  id="backupFrequency"
                  value={config.backup.backupFrequency}
                  onChange={(e) => handleChange('backup', 'backupFrequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={!config.backup.autoBackup}
                >
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="backupTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Hora de respaldo
                </label>
                <input
                  type="time"
                  id="backupTime"
                  value={config.backup.backupTime}
                  onChange={(e) => handleChange('backup', 'backupTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={!config.backup.autoBackup}
                />
              </div>
              
              <div>
                <label htmlFor="retentionPeriodDays" className="block text-sm font-medium text-gray-700 mb-1">
                  Período de retención (días)
                </label>
                <input
                  type="number"
                  id="retentionPeriodDays"
                  min="1"
                  max="365"
                  value={config.backup.retentionPeriodDays}
                  onChange={(e) => handleChange('backup', 'retentionPeriodDays', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={!config.backup.autoBackup}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="includeAttachments" className="block text-sm font-medium text-gray-700">
                    Incluir adjuntos en respaldos
                  </label>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    id="includeAttachments"
                    checked={config.backup.includeAttachments}
                    onChange={(e) => handleChange('backup', 'includeAttachments', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Configuración de Sistema */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Configuración de Sistema</h3>
            <p className="text-sm text-gray-500 mb-4">
              Configura cómo y cuándo se realizan los respaldos automáticos del sistema.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="maintenanceMode" className="block text-sm font-medium text-gray-700">
                    Modo de mantenimiento
                  </label>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    checked={config.system.maintenanceMode}
                    onChange={(e) => handleChange('system', 'maintenanceMode', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="maintenanceMessage" className="block text-sm font-medium text-gray-700">
                    Mensaje de mantenimiento
                  </label>
                </div>
                <div className="ml-4">
                  <input
                    type="text"
                    id="maintenanceMessage"
                    value={config.system.maintenanceMessage}
                    onChange={(e) => handleChange('system', 'maintenanceMessage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};