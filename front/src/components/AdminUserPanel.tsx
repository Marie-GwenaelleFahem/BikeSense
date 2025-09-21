import React, { useState } from 'react';
import { Edit, Trash2, Plus, Save, X, Eye, EyeOff, Mail, User as UserIcon, Shield } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { useToastHelpers } from './Toast';
import type { User, CreateUserData, UpdateUserData } from '../hooks/useUsers';

interface AdminUserPanelProps {
  currentUser: User;
}

const AdminUserPanel: React.FC<AdminUserPanelProps> = ({ currentUser }) => {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
  const { success, error: showError } = useToastHelpers();
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPasswords, setShowPasswords] = useState<Record<number, boolean>>({});
  
  // États pour le formulaire d'édition
  const [editForm, setEditForm] = useState<UpdateUserData>({});
  
  // États pour le formulaire d'ajout
  const [addForm, setAddForm] = useState<CreateUserData>({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    role: 'guest'
  });

  const handleEdit = (user: User) => {
    setEditingUser(user.id);
    setEditForm({
      email: user.email,
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      role: user.role,
      password: '' // Vide par défaut
    });
  };

  const handleSaveEdit = async () => {
    if (editingUser && editForm) {
      // Ne pas envoyer le mot de passe s'il est vide
      const dataToSend = { ...editForm };
      if (!dataToSend.password) {
        delete dataToSend.password;
      }
      
      const successResult = await updateUser(editingUser, dataToSend);
      if (successResult) {
        setEditingUser(null);
        setEditForm({});
        success('Utilisateur modifié', 'Les informations ont été mises à jour avec succès !');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({});
  };

  const handleDelete = async (userId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      const successResult = await deleteUser(userId);
      if (successResult) {
        success('Utilisateur supprimé', 'L\'utilisateur a été supprimé avec succès !');
      }
    }
  };

  const handleAddUser = async () => {
    if (addForm.email && addForm.password) {
      const successResult = await createUser(addForm);
      if (successResult) {
        setShowAddForm(false);
        setAddForm({
          email: '',
          password: '',
          firstname: '',
          lastname: '',
          role: 'guest'
        });
        success('Utilisateur créé', 'Le nouvel utilisateur a été créé avec succès !');
      }
    }
  };

  const togglePasswordVisibility = (userId: number) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  if (currentUser.role !== 'admin') {
    return null; // Ne pas afficher si pas admin
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Gestion des utilisateurs</h2>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Ajouter un utilisateur</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement des utilisateurs...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Nom</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Rôle</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  {editingUser === user.id ? (
                    // Mode édition
                    <>
                      <td className="py-3 px-4">
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder={user.firstname || 'Prénom'}
                            value={editForm.firstname || ''}
                            onChange={(e) => setEditForm({...editForm, firstname: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder={user.lastname || 'Nom'}
                            value={editForm.lastname || ''}
                            onChange={(e) => setEditForm({...editForm, lastname: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="email"
                          placeholder={user.email}
                          value={editForm.email || ''}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-2">
                          <select
                            value={editForm.role || user.role}
                            onChange={(e) => setEditForm({...editForm, role: e.target.value as 'admin' | 'employee' | 'guest'})}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="admin">Administrateur</option>
                            <option value="employee">Employé</option>
                            <option value="guest">Invité</option>
                          </select>
                          <div className="relative">
                            <input
                              type={showPasswords[user.id] ? "text" : "password"}
                              placeholder="Nouveau mot de passe (optionnel)"
                              value={editForm.password || ''}
                              onChange={(e) => setEditForm({...editForm, password: e.target.value})}
                              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(user.id)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPasswords[user.id] ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSaveEdit}
                            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                          >
                            <Save className="h-4 w-4" />
                            <span>Sauver</span>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex items-center space-x-1 bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                          >
                            <X className="h-4 w-4" />
                            <span>Annuler</span>
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    // Mode affichage
                    <>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <UserIcon className="h-4 w-4 text-gray-400" />
                          <span>{user.firstname} {user.lastname}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-red-100 text-red-800' 
                            : user.role === 'employee'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role === 'admin' ? 'Administrateur' : 
                           user.role === 'employee' ? 'Employé' : 'Invité'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                            <span>Modifier</span>
                          </button>
                          {user.id !== currentUser.id && (
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Supprimer</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Formulaire d'ajout d'utilisateur */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Ajouter un utilisateur</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Prénom"
                  value={addForm.firstname || ''}
                  onChange={(e) => setAddForm({...addForm, firstname: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Nom"
                  value={addForm.lastname || ''}
                  onChange={(e) => setAddForm({...addForm, lastname: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <input
                type="email"
                placeholder="Email"
                value={addForm.email}
                onChange={(e) => setAddForm({...addForm, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              
              <input
                type="password"
                placeholder="Mot de passe"
                value={addForm.password}
                onChange={(e) => setAddForm({...addForm, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              
              <select
                value={addForm.role}
                onChange={(e) => setAddForm({...addForm, role: e.target.value as 'admin' | 'employee' | 'guest'})}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="admin">Administrateur</option>
                <option value="employee">Employé</option>
                <option value="guest">Invité</option>
              </select>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded p-3">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddUser}
                disabled={!addForm.email || !addForm.password}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Créer l'utilisateur
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserPanel;
