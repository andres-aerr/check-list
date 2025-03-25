import React from 'react';
import { useChecklistCategory, ChecklistCategory, ChecklistInfo } from '../../contexts/ChecklistCategoryContext';

interface ChecklistCategoriesProps {
  onSelectCategory: (categoryId: string | null) => void;
  selectedCategoryId: string | null;
  onViewChecklist?: (id: string) => void;
}

export const ChecklistCategories: React.FC<ChecklistCategoriesProps> = ({
  onSelectCategory,
  selectedCategoryId,
  onViewChecklist
}) => {
  const { categories } = useChecklistCategory();
  
  // Función para manejar la selección de categoría
  const handleSelectCategory = (categoryId: string | null) => {
    // Solo actualizamos el estado de la categoría seleccionada sin expandir los checklists
    onSelectCategory(categoryId);
  };
  
  const getTypeLabel = (type: ChecklistInfo['type']) => {
    const types: Record<string, string> = {
      equipment: 'Equipos',
      mining: 'Minería',
      explosives: 'Explosivos',
      transport: 'Transporte',
      maintenance: 'Mantenimiento',
      emergency: 'Emergencia'
    };
    return types[type] || type;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Categorías de Checklists</h2>
      <div className="space-y-2">
        <button
          className={`w-full text-left px-3 py-2 rounded-md ${!selectedCategoryId ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
          onClick={() => handleSelectCategory(null)}
        >
          Todos los checklists
        </button>
        
        {categories.map((category) => (
          <div key={category.id} className="mb-2">
            <button
              className={`w-full text-left px-3 py-2 rounded-md ${selectedCategoryId === category.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              onClick={() => handleSelectCategory(category.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{category.name}</div>
                  {category.description && (
                    <div className="text-sm text-gray-500">{category.description}</div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    {category.checklists.length} checklists
                  </div>
                </div>
                <div className="text-gray-400">
                  {/* Mantenemos el icono de flecha pero no expandimos los checklists */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </button>
            {/* Eliminamos la expansión de checklists en la barra lateral */}
          </div>
        ))}
      </div>
    </div>
  );
};