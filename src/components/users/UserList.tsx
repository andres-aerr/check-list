import React, { useState } from 'react';
import { UserDetail } from './UserDetail';
import { UserForm, UserFormData } from './UserForm';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'contract_admin' | 'preventionist' | 'operational' | 'supervisor';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

interface UserListProps {
  users: User[];
  onUserCreated: (user: UserFormData) => void;
  onUserUpdated: (userId: string, user: UserFormData) => void;
  onUserDeleted: (userId: string) => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  onUserCreated,
  onUserUpdated,
  onUserDeleted
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleAddUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (userId: string) => {
    const userToEdit = users.find(user => user.id === userId);
    if (userToEdit) {
      setEditingUser(userToEdit);
      setShowForm(true);
    }
  };

  const handleDeleteUser = (userId: string) => {
    setConfirmDelete(userId);
  };

  const confirmDeleteUser = () => {
    if (confirmDelete) {
      onUserDeleted(confirmDelete);
      setConfirmDelete(null);
    }
  };

  const handleFormSubmit = (formData: UserFormData) => {
    if (editingUser) {
      onUserUpdated(editingUser.id, formData);
    } else {
      onUserCreated(formData);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Botón para agregar nuevo usuario */}
      {!showForm && (
        <div className="flex justify-end">
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Nuevo Usuario
          </button>
        </div>
      )}

      {/* Formulario para crear/editar usuario */}
      {showForm && (
        <UserForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          initialData={editingUser || undefined}
          isEditing={!!editingUser}
        />
      )}

      {/* Modal de confirmación para eliminar usuario */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmar eliminación</h3>
            <p className="text-gray-500 mb-6">
              ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de usuarios */}
      {!showForm && users.length > 0 ? (
        <div className="space-y-4">
          {users.map(user => (
            <UserDetail
              key={user.id}
              user={user}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ))}
        </div>
      ) : !showForm ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay usuarios registrados.</p>
        </div>
      ) : null}
    </div>
  );
};