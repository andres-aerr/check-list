import React, { useState, useEffect } from "react";
import {
  useChecklistCategory,
  ChecklistInfo,
} from "../../contexts/ChecklistCategoryContext";

interface User {
  id: string;
  fullName: string;
  email: string;
  role:
    | "admin"
    | "contract_admin"
    | "preventionist"
    | "operational"
    | "supervisor";
  status: "active" | "inactive";
  lastLogin: string;
  createdAt: string;
}

interface UserChecklistAssignmentProps {
  user: User;
  onClose: () => void;
  onSave: (userId: string, assignedChecklists: string[]) => void;
}

export const UserChecklistAssignment: React.FC<
  UserChecklistAssignmentProps
> = ({ user, onClose, onSave }) => {
  const { categories, getAllChecklists } = useChecklistCategory();
  const [selectedChecklists, setSelectedChecklists] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // En una aplicación real, aquí cargaríamos los checklists asignados al usuario desde el backend
  useEffect(() => {
    // Simulación: asignar algunos checklists aleatoriamente para demostración
    const allChecklists = getAllChecklists();
    const randomChecklists = allChecklists
      .filter(() => Math.random() > 0.7) // Seleccionar aproximadamente el 30% de los checklists
      .map((checklist) => checklist.id);

    setSelectedChecklists(randomChecklists);
  }, [getAllChecklists]);

  const allChecklists = getAllChecklists();

  // Filtrar checklists por categoría y término de búsqueda
  const filteredChecklists = allChecklists.filter((checklist) => {
    const matchesSearch =
      searchTerm === "" ||
      checklist.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      categories
        .find((cat) => cat.id === selectedCategory)
        ?.checklists.some((c) => c.id === checklist.id);

    return matchesSearch && matchesCategory;
  });

  const handleChecklistToggle = (checklistId: string) => {
    setSelectedChecklists((prev) => {
      if (prev.includes(checklistId)) {
        return prev.filter((id) => id !== checklistId);
      } else {
        return [...prev, checklistId];
      }
    });
  };

  const handleSave = () => {
    onSave(user.id, selectedChecklists);
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-900'>
            Asignar Checklists a {user.fullName}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <div className='mb-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            {/* Búsqueda */}
            <div>
              <label
                htmlFor='searchTerm'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Buscar checklist
              </label>
              <input
                type='text'
                id='searchTerm'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Nombre del checklist'
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              />
            </div>

            {/* Filtro por categoría */}
            <div>
              <label
                htmlFor='category'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Categoría
              </label>
              <select
                id='category'
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              >
                <option value='all'>Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex justify-between items-center mb-2'>
            <p className='text-sm text-gray-600'>
              {filteredChecklists.length} checklists encontrados
            </p>
            <div className='flex items-center'>
              <span className='text-sm text-gray-600 mr-2'>
                {selectedChecklists.length} seleccionados
              </span>
              <button
                onClick={() => setSelectedChecklists([])}
                className='text-sm text-blue-600 hover:text-blue-800'
              >
                Deseleccionar todos
              </button>
            </div>
          </div>
        </div>

        {/* Lista de checklists */}
        <div className='border rounded-md overflow-hidden mb-6'>
          <div className='max-h-96 overflow-y-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50 sticky top-0'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Seleccionar
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Nombre
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Tipo
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Categoría
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredChecklists.map((checklist) => {
                  const isSelected = selectedChecklists.includes(checklist.id);
                  const category = categories.find((cat) =>
                    cat.checklists.some((c) => c.id === checklist.id)
                  );

                  return (
                    <tr
                      key={checklist.id}
                      className={isSelected ? "bg-blue-50" : "hover:bg-gray-50"}
                      onClick={() => handleChecklistToggle(checklist.id)}
                    >
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <input
                          type='checkbox'
                          checked={isSelected}
                          onChange={() => handleChecklistToggle(checklist.id)}
                          className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                        />
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>
                          {checklist.title}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
                          {checklist.type === "equipment"
                            ? "Equipos"
                            : checklist.type === "mining"
                            ? "Minería"
                            : checklist.type === "explosives"
                            ? "Explosivos"
                            : checklist.type === "transport"
                            ? "Transporte"
                            : checklist.type === "maintenance"
                            ? "Mantenimiento"
                            : "Emergencia"}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {category ? category.name : "Sin categoría"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className='flex justify-end space-x-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          >
            Guardar Asignaciones
          </button>
        </div>
      </div>
    </div>
  );
};
