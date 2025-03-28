// Definición de tipos para puestos de trabajo y sus checklists asociados

export interface JobPosition {
  id: string;
  name: string;
  description: string;
  operationalRole: string;
  jobTitle: string; // Puesto específico del trabajador
  defaultChecklists: string[];
  requiredSupervisor: boolean;
  requiredPreventionist: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobPositionHistory {
  id: string;
  userId: string;
  oldPosition: string | null;
  newPosition: string;
  changedBy: string;
  changedAt: string;
  reason?: string;
}

// Datos de ejemplo para puestos de trabajo
const jobPositions: JobPosition[] = [
  {
    id: "underground-operator",
    name: "Operador de Maquinaria Subterránea",
    description:
      "Responsable de operar y mantener maquinaria pesada en entornos subterráneos",
    operationalRole: "Usuario Operacional",
    jobTitle: "Operador de Maquinaria",
    defaultChecklists: [
      "min-5", // Checklist diario para maquinaria subterránea
      "min-14", // Checklist de operación de jumbos
      "min-16", // Checklist de operación de scoops
      "gen-1", // Checklist diario de seguridad general
      "min-1", // Checklist de ventilación y calidad del aire
      "min-3", // Checklist de sistemas de iluminación y señalización
      "min-4", // Checklist de vías de evacuación y refugios subterráneos
    ],
    requiredSupervisor: true,
    requiredPreventionist: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "master-builder",
    name: "Maestro de Obras",
    description:
      "Supervisa y coordina las actividades de construcción y personal a cargo",
    operationalRole: "Usuario Operacional",
    jobTitle: "Maestro de Obras",
    defaultChecklists: [
      "gen-4", // Checklist de orden y aseo de faenas
      "min-6", // Checklist de estabilidad y seguridad de taludes
      "min-7", // Checklist para caminos internos y accesos
      "min-10", // Checklist de inspección de frentes de trabajo
      "min-13", // Checklist de inspección de fortificación
      "gen-1", // Checklist diario de seguridad general
      "haz-4", // Checklist de gestión de residuos industriales y peligrosos
    ],
    requiredSupervisor: true,
    requiredPreventionist: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "rigger",
    name: "Rigger",
    description: "Especialista en montaje y manipulación de equipos de izaje",
    operationalRole: "Usuario Operacional",
    jobTitle: "Rigger",
    defaultChecklists: [
      "cri-1", // Checklist para operación de grúas e izaje
      "min-18", // Checklist de operación de equipos de levante
      "gen-1", // Checklist diario de seguridad general
      "gen-4", // Checklist de orden y aseo de faenas
      "tra-4", // Checklist para transporte interno de cargas especiales
      "mai-2", // Checklist de mantenimiento mecánico general
    ],
    requiredSupervisor: true,
    requiredPreventionist: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "safety-supervisor",
    name: "Supervisor de Seguridad",
    description:
      "Supervisa y garantiza el cumplimiento de normas de seguridad en el área",
    operationalRole: "Supervisor",
    jobTitle: "Supervisor de Seguridad",
    defaultChecklists: [
      "aud-1", // Checklist de auditorías internas de seguridad
      "aud-2", // Checklist de auditorías ambientales
      "aud-3", // Checklist de control documental normativo
      "gen-2", // Checklist semanal de seguridad general
      "gen-3", // Checklist mensual de seguridad general
      "eme-2", // Checklist para simulacros de evacuación
      "eme-3", // Checklist de sistemas de comunicación de emergencia
    ],
    requiredSupervisor: false,
    requiredPreventionist: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "preventionist",
    name: "Prevencionista de Riesgos",
    description:
      "Responsable de la seguridad y prevención de riesgos en toda la operación",
    operationalRole: "Prevencionista",
    jobTitle: "Prevencionista de Riesgos",
    defaultChecklists: [
      "aud-1", // Checklist de auditorías internas de seguridad
      "aud-2", // Checklist de auditorías ambientales
      "aud-3", // Checklist de control documental normativo
      "gen-3", // Checklist mensual de seguridad general
      "eme-1", // Checklist diario de equipos de emergencia
      "eme-2", // Checklist para simulacros de evacuación
      "eme-3", // Checklist de sistemas de comunicación de emergencia
      "eme-4", // Checklist posterior a incidentes y emergencias
      "env-1", // Checklist de cumplimiento ambiental general
      "env-3", // Checklist de prevención y respuesta ante derrames
    ],
    requiredSupervisor: false,
    requiredPreventionist: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "foreman",
    name: "Capataz",
    description:
      "Coordina y supervisa las actividades diarias del equipo de trabajo",
    operationalRole: "Supervisor",
    jobTitle: "Capataz",
    defaultChecklists: [
      "gen-1", // Checklist diario de seguridad general
      "gen-2", // Checklist semanal de seguridad general
      "gen-4", // Checklist de orden y aseo de faenas
      "min-10", // Checklist de inspección de frentes de trabajo
      "min-7", // Checklist para caminos internos y accesos
      "aud-1", // Checklist de auditorías internas de seguridad
    ],
    requiredSupervisor: true,
    requiredPreventionist: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "heavy-equipment-operator",
    name: "Operador de Equipos Pesados",
    description:
      "Opera maquinaria pesada como excavadoras, cargadores y camiones mineros",
    operationalRole: "Usuario Operacional",
    jobTitle: "Operador de Maquinaria",
    defaultChecklists: [
      "min-9", // Checklist diario de equipos pesados
      "min-11", // Checklist de operación de palas y cargadores
      "min-12", // Checklist de operación de camiones mineros
      "gen-1", // Checklist diario de seguridad general
      "gen-4", // Checklist de orden y aseo de faenas
      "mai-2", // Checklist de mantenimiento mecánico general
      "mai-3", // Checklist específico para mantenimiento de equipos críticos
    ],
    requiredSupervisor: true,
    requiredPreventionist: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "mining-assistant",
    name: "Ayudante Minero",
    description:
      "Asiste en las operaciones mineras y apoya en tareas generales de la mina",
    operationalRole: "Usuario Operacional",
    jobTitle: "Ayudante Minero",
    defaultChecklists: [
      "gen-1", // Checklist diario de seguridad general
      "gen-4", // Checklist de orden y aseo de faenas
      "min-1", // Checklist de ventilación y calidad del aire
      "min-3", // Checklist de sistemas de iluminación y señalización
      "min-4", // Checklist de vías de evacuación y refugios subterráneos
      "min-8", // Checklist de control de polvo en suspensión
    ],
    requiredSupervisor: true,
    requiredPreventionist: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "master-builder-first",
    name: "Maestro de Primera",
    description:
      "Lidera y ejecuta trabajos especializados de construcción y mantenimiento",
    operationalRole: "Usuario Operacional",
    jobTitle: "Maestro de Primera",
    defaultChecklists: [
      "gen-1", // Checklist diario de seguridad general
      "gen-4", // Checklist de orden y aseo de faenas
      "min-6", // Checklist de estabilidad y seguridad de taludes
      "min-7", // Checklist para caminos internos y accesos
      "min-10", // Checklist de inspección de frentes de trabajo
      "min-13", // Checklist de inspección de fortificación
      "mai-2", // Checklist de mantenimiento mecánico general
    ],
    requiredSupervisor: true,
    requiredPreventionist: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "alarife",
    name: "Alarife",
    description:
      "Especialista en trabajos de albañilería y construcción en minería",
    operationalRole: "Usuario Operacional",
    jobTitle: "Alarife",
    defaultChecklists: [
      "gen-1", // Checklist diario de seguridad general
      "gen-4", // Checklist de orden y aseo de faenas
      "min-6", // Checklist de estabilidad y seguridad de taludes
      "min-10", // Checklist de inspección de frentes de trabajo
      "min-13", // Checklist de inspección de fortificación
      "haz-4", // Checklist de gestión de residuos industriales y peligrosos
    ],
    requiredSupervisor: true,
    requiredPreventionist: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

// Funciones de utilidad para gestionar puestos de trabajo
export const getAllJobPositions = (): JobPosition[] => {
  return jobPositions;
};

export const getJobPositionById = (
  positionId: string
): JobPosition | undefined => {
  return jobPositions.find((pos) => pos.id === positionId);
};

export const getDefaultChecklistsForJobPosition = (
  positionId: string
): string[] => {
  const position = jobPositions.find((pos) => pos.id === positionId);
  return position ? position.defaultChecklists : [];
};
