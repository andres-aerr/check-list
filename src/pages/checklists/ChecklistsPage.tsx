import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChecklistItem } from "../../components/checklists/ChecklistItem";
import { ChecklistDetail } from "../../components/checklists/ChecklistDetail";
import {
  ChecklistForm,
  ChecklistFormData,
} from "../../components/checklists/ChecklistForm";
import { ChecklistCategories } from "../../components/checklists/ChecklistCategories";
import { useAuth } from "../../contexts/AuthContext";
import {
  useChecklistCategory,
  ChecklistInfo,
} from "../../contexts/ChecklistCategoryContext";
import { Modal } from "../../components/common/Modal";

export const ChecklistsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { categories, getChecklistsByCategory, getAllChecklists } =
    useChecklistCategory();
  const [checklists, setChecklists] = useState<any[]>([]);
  const [selectedChecklist, setSelectedChecklist] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [checklistToEdit, setChecklistToEdit] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [checklistToDelete, setChecklistToDelete] = useState<any>(null);
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const canCreateChecklist =
    user && ["admin", "contract_admin", "preventionist"].includes(user.role);
  const canEditChecklist =
    user && ["admin", "contract_admin", "preventionist"].includes(user.role);
  const canDeleteChecklist =
    user && ["admin", "contract_admin"].includes(user.role);

  const getCategoryTitle = () => {
    if (categoryId) {
      const selectedCategory = categories.find((cat) => cat.id === categoryId);
      return selectedCategory ? selectedCategory.name : "Checklists";
    }
    return "Todos los Checklists";
  };

  // Cargar checklists basados en la categoría y filtros seleccionados
  useEffect(() => {
    let filteredChecklists: ChecklistInfo[] = [];

    // Obtener checklists según la categoría seleccionada
    if (categoryId) {
      filteredChecklists = getChecklistsByCategory(categoryId);
    } else {
      filteredChecklists = getAllChecklists();
    }

    // Aplicar filtro por tipo
    if (filterType !== "all") {
      filteredChecklists = filteredChecklists.filter(
        (checklist) => checklist.type === filterType
      );
    }

    // Aplicar filtro por término de búsqueda
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filteredChecklists = filteredChecklists.filter((checklist) =>
        checklist.title.toLowerCase().includes(term)
      );
    }

    // Convertir los ChecklistInfo a objetos completos para la visualización
    // En una aplicación real, aquí se cargarían los datos completos desde el backend
    const fullChecklists = filteredChecklists.map((info) => {
      // Asignar un estado aleatorio para demostración
      // En una aplicación real, esto vendría del backend
      const statuses: Array<"pending" | "completed" | "in_progress"> = [
        "pending",
        "completed",
        "in_progress",
      ];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      return {
        id: info.id,
        title: info.title,
        type: info.type,
        description: info.description || "",
        status: randomStatus,
        assignedTo: "Sin asignar",
        dueDate: new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString().split("T")[0],
      };
    });

    // Estado eliminado según requerimiento
    setChecklists(fullChecklists);
  }, [
    categoryId,
    filterType,
    searchTerm,
    getChecklistsByCategory,
    getAllChecklists,
  ]);

  // Función para manejar la creación de un nuevo checklist
  const handleCreateChecklist = (data: ChecklistFormData) => {
    // En una aplicación real, aquí se enviaría la información al backend
    // Para esta maqueta, simplemente agregamos el nuevo checklist a la lista local
    const newChecklist = {
      id: `new-${Date.now()}`,
      title: data.title,
      type: data.type,
      description: data.description,
      status: "pending" as const,
      assignedTo: data.assignedTo,
      dueDate: data.dueDate,
      createdAt: new Date().toISOString().split("T")[0],
      items: data.items,
    };

    setChecklists([newChecklist, ...checklists]);
    setIsCreating(false);
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-gray-900'>
            {getCategoryTitle()}
          </h1>
          {canCreateChecklist && (
            <button
              className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
              onClick={() => setIsCreating(true)}
            >
              Nuevo Checklist
            </button>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <div className='md:col-span-1'>
            <ChecklistCategories
              onSelectCategory={setCategoryId}
              selectedCategoryId={categoryId}
            />
          </div>

          <div className='md:col-span-3'>
            <div className='bg-white p-4 rounded-lg shadow mb-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Tipo
                  </label>
                  <select
                    className='w-full border-gray-300 rounded-md'
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value='all'>Todos los tipos</option>
                    <option value='equipment'>Equipos</option>
                    <option value='mining'>Minería</option>
                    <option value='explosives'>Explosivos</option>
                    <option value='transport'>Transporte</option>
                    <option value='maintenance'>Mantenimiento</option>
                    <option value='emergency'>Emergencia</option>
                  </select>
                </div>
                {/* Filtro de estado eliminado según requerimiento */}
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Búsqueda
                  </label>
                  <input
                    type='text'
                    className='w-full border-gray-300 rounded-md'
                    placeholder='Buscar por título...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {checklists.length === 0 ? (
              <div className='bg-white shadow rounded-md p-6 text-center'>
                <p className='text-gray-500'>No hay checklists disponibles.</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {checklists.map((checklist) => (
                  <ChecklistItem
                    key={checklist.id}
                    id={checklist.id}
                    title={checklist.title}
                    type={checklist.type}
                    status={checklist.status}
                    assignedTo={checklist.assignedTo}
                    dueDate={checklist.dueDate}
                    createdAt={checklist.createdAt}
                    onView={() => setSelectedChecklist(checklist)}
                    onEdit={
                      canEditChecklist
                        ? () => {
                            setChecklistToEdit(checklist);
                            setIsEditing(true);
                          }
                        : undefined
                    }
                    onDelete={canDeleteChecklist ? () => {} : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para crear un nuevo checklist */}
      {isCreating && (
        <Modal
          isOpen={isCreating}
          onClose={() => setIsCreating(false)}
          maxWidth='max-w-4xl'
        >
          <ChecklistForm
            onSubmit={handleCreateChecklist}
            onCancel={() => setIsCreating(false)}
          />
        </Modal>
      )}

      {/* Modal para ver detalles del checklist */}
      {selectedChecklist && (
        <Modal
          isOpen={!!selectedChecklist}
          onClose={() => setSelectedChecklist(null)}
        >
          <ChecklistDetail
            id={selectedChecklist.id}
            title={selectedChecklist.title}
            type={selectedChecklist.type}
            status={selectedChecklist.status}
            assignedTo={selectedChecklist.assignedTo}
            dueDate={selectedChecklist.dueDate}
            createdAt={selectedChecklist.createdAt}
            description={selectedChecklist.description}
            items={selectedChecklist.items || []}
            onBack={() => setSelectedChecklist(null)}
            onEdit={
              canEditChecklist
                ? () => {
                    setChecklistToEdit(selectedChecklist);
                    setIsEditing(true);
                    setSelectedChecklist(null);
                  }
                : undefined
            }
          />
        </Modal>
      )}

      {/* Modal para editar un checklist existente */}
      {isEditing && checklistToEdit && (
        <Modal
          isOpen={isEditing}
          onClose={() => {
            setIsEditing(false);
            setChecklistToEdit(null);
          }}
          maxWidth='max-w-4xl'
        >
          <ChecklistForm
            onSubmit={(data) => {
              // En una aplicación real, aquí se enviaría la información al backend
              // Para esta maqueta, simplemente actualizamos el checklist en la lista local
              const updatedChecklists = checklists.map((checklist) =>
                checklist.id === checklistToEdit.id
                  ? {
                      ...checklist,
                      title: data.title,
                      type: data.type,
                      description: data.description,
                      assignedTo: data.assignedTo,
                      dueDate: data.dueDate,
                      items: data.items,
                    }
                  : checklist
              );

              setChecklists(updatedChecklists);
              setIsEditing(false);
              setChecklistToEdit(null);
            }}
            onCancel={() => {
              setIsEditing(false);
              setChecklistToEdit(null);
            }}
            initialData={{
              title: checklistToEdit.title,
              type: checklistToEdit.type,
              assignedTo: checklistToEdit.assignedTo,
              dueDate: checklistToEdit.dueDate,
              description: checklistToEdit.description,
              items: checklistToEdit.items || [
                {
                  id: "1",
                  description: "",
                  required: true,
                  hasEvidence: false,
                },
              ],
            }}
            isEditing={true}
          />
        </Modal>
      )}
    </div>
  );
};
