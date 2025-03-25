import { createContext, useContext, useState, ReactNode } from 'react';

// Definición de tipos para las categorías y checklists
export interface ChecklistCategory {
  id: string;
  name: string;
  description?: string;
  checklists: ChecklistInfo[];
}

export interface ChecklistInfo {
  id: string;
  title: string;
  description?: string;
  type: 'equipment' | 'mining' | 'explosives' | 'transport' | 'maintenance' | 'emergency';
}

interface ChecklistCategoryContextType {
  categories: ChecklistCategory[];
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
  getChecklistsByCategory: (categoryId: string) => ChecklistInfo[];
  getAllChecklists: () => ChecklistInfo[];
}

const ChecklistCategoryContext = createContext<ChecklistCategoryContextType | undefined>(undefined);

export const useChecklistCategory = () => {
  const context = useContext(ChecklistCategoryContext);
  if (!context) {
    throw new Error('useChecklistCategory debe ser usado dentro de un ChecklistCategoryProvider');
  }
  return context;
};

interface ChecklistCategoryProviderProps {
  children: ReactNode;
}

export const ChecklistCategoryProvider = ({ children }: ChecklistCategoryProviderProps) => {
  // Datos iniciales de categorías y checklists
  const initialCategories: ChecklistCategory[] = [
    {
      id: 'general',
      name: 'Checklists Generales',
      description: 'Checklists para seguridad general y orden en faenas',
      checklists: [
        { id: 'gen-1', title: 'Checklist diario de seguridad general', type: 'equipment' },
        { id: 'gen-2', title: 'Checklist semanal de seguridad general', type: 'equipment' },
        { id: 'gen-3', title: 'Checklist mensual de seguridad general', type: 'equipment' },
        { id: 'gen-4', title: 'Checklist de orden y aseo de faenas', type: 'maintenance' }
      ]
    },
    {
      id: 'mining',
      name: 'Faenas Mineras Específicas',
      description: 'Checklists para operaciones en minas subterráneas y a cielo abierto',
      checklists: [
        { id: 'min-1', title: 'Checklist de ventilación y calidad del aire', type: 'mining' },
        { id: 'min-2', title: 'Checklist de sostenimiento y estabilidad de galerías', type: 'mining' },
        { id: 'min-3', title: 'Checklist de sistemas de iluminación y señalización', type: 'mining' },
        { id: 'min-4', title: 'Checklist de vías de evacuación y refugios subterráneos', type: 'mining' },
        { id: 'min-5', title: 'Checklist diario para maquinaria subterránea', type: 'equipment' },
        { id: 'min-6', title: 'Checklist de estabilidad y seguridad de taludes', type: 'mining' },
        { id: 'min-7', title: 'Checklist para caminos internos y accesos', type: 'mining' },
        { id: 'min-8', title: 'Checklist de control de polvo en suspensión', type: 'mining' },
        { id: 'min-9', title: 'Checklist diario de equipos pesados', type: 'equipment' },
        { id: 'min-10', title: 'Checklist de inspección de frentes de trabajo', type: 'mining' },
        { id: 'min-11', title: 'Checklist de operación de palas y cargadores', type: 'equipment' },
        { id: 'min-12', title: 'Checklist de operación de camiones mineros', type: 'equipment' },
        { id: 'min-13', title: 'Checklist de inspección de fortificación', type: 'mining' },
        { id: 'min-14', title: 'Checklist de operación de jumbos', type: 'equipment' },
        { id: 'min-15', title: 'Checklist de inspección de piques mineros', type: 'mining' },
        { id: 'min-16', title: 'Checklist de operación de scoops', type: 'equipment' },
        { id: 'min-17', title: 'Checklist de inspección de chimeneas de ventilación', type: 'mining' },
        { id: 'min-18', title: 'Checklist de operación de equipos de levante', type: 'equipment' },
        { id: 'min-19', title: 'Checklist de inspección de sistemas de drenaje', type: 'mining' },
        { id: 'min-20', title: 'Checklist de operación de chancadores primarios', type: 'equipment' }
      ]
    },
    {
      id: 'drilling',
      name: 'Perforación y Tronadura',
      description: 'Checklists para operaciones de perforación y tronadura',
      checklists: [
        { id: 'dri-1', title: 'Checklist previo a la perforación', type: 'mining' },
        { id: 'dri-2', title: 'Checklist de carguío de explosivos', type: 'explosives' },
        { id: 'dri-3', title: 'Checklist previo a tronadura', type: 'explosives' },
        { id: 'dri-4', title: 'Checklist posterior a tronadura', type: 'explosives' },
        { id: 'dri-5', title: 'Checklist de control de tiros fallidos', type: 'explosives' },
        { id: 'dri-6', title: 'Checklist de inspección de equipos de perforación', type: 'equipment' },
        { id: 'dri-7', title: 'Checklist de seguridad para perforación en bancos', type: 'mining' },
        { id: 'dri-8', title: 'Checklist de perforación en frentes de desarrollo', type: 'mining' },
        { id: 'dri-9', title: 'Checklist de perforación en chimeneas', type: 'mining' },
        { id: 'dri-10', title: 'Checklist de perforación en piques', type: 'mining' },
        { id: 'dri-11', title: 'Checklist de mantenimiento de equipos de perforación', type: 'maintenance' },
        { id: 'dri-12', title: 'Checklist de diseño de malla de perforación', type: 'mining' },
        { id: 'dri-13', title: 'Checklist de control de calidad de perforación', type: 'mining' },
        { id: 'dri-14', title: 'Checklist de seguridad para carguío de explosivos', type: 'explosives' },
        { id: 'dri-15', title: 'Checklist de transporte interno de explosivos', type: 'explosives' },
        { id: 'dri-16', title: 'Checklist de evacuación para tronadura', type: 'explosives' },
        { id: 'dri-17', title: 'Checklist de monitoreo de vibraciones por tronadura', type: 'mining' },
        { id: 'dri-18', title: 'Checklist de control de fragmentación post-tronadura', type: 'mining' },
        { id: 'dri-19', title: 'Checklist de inspección de áreas post-tronadura', type: 'explosives' },
        { id: 'dri-20', title: 'Checklist de gestión de residuos de explosivos', type: 'explosives' }
      ]
    },
    {
      id: 'explosives',
      name: 'Manipulación de Explosivos',
      description: 'Checklists para manejo seguro de explosivos',
      checklists: [
        { id: 'exp-1', title: 'Checklist diario de polvorines', type: 'explosives' },
        { id: 'exp-2', title: 'Checklist de transporte seguro de explosivos', type: 'explosives' }
      ]
    },
    {
      id: 'transport',
      name: 'Transporte',
      description: 'Checklists para transporte de personal y materiales',
      checklists: [
        { id: 'tra-1', title: 'Checklist de vehículos livianos y camionetas', type: 'transport' },
        { id: 'tra-2', title: 'Checklist de transporte de personal', type: 'transport' },
        { id: 'tra-3', title: 'Checklist de transporte de sustancias peligrosas', type: 'transport' },
        { id: 'tra-4', title: 'Checklist para transporte interno de cargas especiales', type: 'transport' }
      ]
    },
    {
      id: 'maintenance',
      name: 'Mantenimiento',
      description: 'Checklists para mantenimiento de equipos e instalaciones',
      checklists: [
        { id: 'mai-1', title: 'Checklist de mantenimiento eléctrico', type: 'maintenance' },
        { id: 'mai-2', title: 'Checklist de mantenimiento mecánico general', type: 'maintenance' },
        { id: 'mai-3', title: 'Checklist específico para mantenimiento de equipos críticos', type: 'maintenance' }
      ]
    },
    {
      id: 'critical',
      name: 'Operación de Equipos Críticos',
      description: 'Checklists para operación segura de equipos críticos',
      checklists: [
        { id: 'cri-1', title: 'Checklist para operación de grúas e izaje', type: 'equipment' },
        { id: 'cri-2', title: 'Checklist para calderas y recipientes a presión', type: 'equipment' },
        { id: 'cri-3', title: 'Checklist para sistemas de transporte vertical', type: 'transport' },
        { id: 'cri-4', title: 'Checklist para sistemas de bombeo y drenaje', type: 'equipment' }
      ]
    },
    {
      id: 'hazardous',
      name: 'Manejo de Sustancias Peligrosas y Residuos Mineros',
      description: 'Checklists para manejo seguro de sustancias peligrosas y residuos',
      checklists: [
        { id: 'haz-1', title: 'Checklist de almacenamiento y manejo seguro de combustibles', type: 'maintenance' },
        { id: 'haz-2', title: 'Checklist de almacenamiento y manejo de reactivos químicos', type: 'maintenance' },
        { id: 'haz-3', title: 'Checklist de inspección de tranques de relaves y botaderos', type: 'mining' },
        { id: 'haz-4', title: 'Checklist de gestión de residuos industriales y peligrosos', type: 'maintenance' }
      ]
    },
    {
      id: 'emergency',
      name: 'Emergencias y Evacuación',
      description: 'Checklists para preparación y respuesta ante emergencias',
      checklists: [
        { id: 'eme-1', title: 'Checklist diario de equipos de emergencia', type: 'emergency' },
        { id: 'eme-2', title: 'Checklist para simulacros de evacuación', type: 'emergency' },
        { id: 'eme-3', title: 'Checklist de sistemas de comunicación de emergencia', type: 'emergency' },
        { id: 'eme-4', title: 'Checklist posterior a incidentes y emergencias', type: 'emergency' }
      ]
    },
    {
      id: 'health',
      name: 'Salud Ocupacional',
      description: 'Checklists para monitoreo y control de riesgos para la salud',
      checklists: [
        { id: 'hea-1', title: 'Checklist de monitoreo de ruido ocupacional', type: 'maintenance' },
        { id: 'hea-2', title: 'Checklist de exposición a polvo y sílice', type: 'mining' },
        { id: 'hea-3', title: 'Checklist de condiciones ergonómicas en puestos de trabajo', type: 'maintenance' },
        { id: 'hea-4', title: 'Checklist de control de temperaturas extremas', type: 'mining' }
      ]
    },
    {
      id: 'environment',
      name: 'Medio Ambiente',
      description: 'Checklists para control y monitoreo ambiental',
      checklists: [
        { id: 'env-1', title: 'Checklist de cumplimiento ambiental general', type: 'maintenance' },
        { id: 'env-2', title: 'Checklist de monitoreo de emisiones', type: 'mining' },
        { id: 'env-3', title: 'Checklist de prevención y respuesta ante derrames', type: 'emergency' }
      ]
    },
    {
      id: 'audit',
      name: 'Auditorías y Gestión',
      description: 'Checklists para auditorías y control documental',
      checklists: [
        { id: 'aud-1', title: 'Checklist de auditorías internas de seguridad', type: 'maintenance' },
        { id: 'aud-2', title: 'Checklist de auditorías ambientales', type: 'maintenance' },
        { id: 'aud-3', title: 'Checklist de control documental normativo', type: 'maintenance' }
      ]
    }
  ];

  const [categories] = useState<ChecklistCategory[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Función para obtener checklists por categoría
  const getChecklistsByCategory = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.checklists : [];
  };

  // Función para obtener todos los checklists
  const getAllChecklists = () => {
    return categories.flatMap(category => category.checklists);
  };

  const value = {
    categories,
    selectedCategory,
    setSelectedCategory,
    getChecklistsByCategory,
    getAllChecklists
  };

  return <ChecklistCategoryContext.Provider value={value}>{children}</ChecklistCategoryContext.Provider>;
};