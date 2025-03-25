import React, { useState } from 'react';

interface ChecklistItemProgressProps {
  id: string;
  description: string;
  required: boolean;
  hasEvidence: boolean;
  completed?: boolean;
  evidence?: string;
  notes?: string;
  onUpdateItem: (id: string, updates: Partial<ChecklistItemProgressProps>) => void;
  disabled?: boolean;
}

export const ChecklistItemProgress: React.FC<ChecklistItemProgressProps> = ({
  id,
  description,
  required,
  hasEvidence,
  completed = false,
  evidence = '',
  notes = '',
  onUpdateItem,
  disabled = false
}) => {
  const [itemNotes, setItemNotes] = useState(notes);
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(evidence);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateItem(id, { completed: e.target.checked });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setItemNotes(e.target.value);
  };

  const handleNoteBlur = () => {
    onUpdateItem(id, { notes: itemNotes });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEvidenceFile(file);
      
      // Crear una URL para previsualizar la imagen
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      
      // En una aplicación real, aquí se subiría el archivo a un servidor
      // y se obtendría la URL del archivo subido
      onUpdateItem(id, { evidence: fileUrl });
    }
  };

  return (
    <div className={`p-4 border rounded-md ${completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCheckboxChange}
            disabled={disabled}
            className="h-5 w-5 text-blue-600 mt-0.5 mr-3"
          />
          <div>
            <p className="font-medium">{description}</p>
            <div className="mt-1 flex space-x-2">
              {required && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                  Obligatorio
                </span>
              )}
              {hasEvidence && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                  Requiere evidencia
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 pl-8">
        {hasEvidence && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Evidencia
            </label>
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={disabled}
                className="hidden"
                id={`evidence-upload-${id}`}
              />
              <label
                htmlFor={`evidence-upload-${id}`}
                className={`px-3 py-1 border border-gray-300 rounded-md text-sm ${disabled ? 'bg-gray-100 text-gray-500' : 'text-gray-700 hover:bg-gray-50 cursor-pointer'}`}
              >
                Subir imagen
              </label>
              {previewUrl && (
                <div className="ml-4">
                  <img 
                    src={previewUrl} 
                    alt="Evidencia" 
                    className="h-16 w-16 object-cover rounded-md border border-gray-300" 
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notas
          </label>
          <textarea
            value={itemNotes}
            onChange={handleNotesChange}
            onBlur={handleNoteBlur}
            disabled={disabled}
            rows={2}
            className={`w-full px-3 py-2 border rounded-md ${disabled ? 'bg-gray-100 text-gray-500' : 'border-gray-300'}`}
            placeholder="Agregar notas o comentarios..."
          />
        </div>
      </div>
    </div>
  );
};