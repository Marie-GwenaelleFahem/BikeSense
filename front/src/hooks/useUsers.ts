import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

export interface User {
  id: number;
  email: string;
  firstname?: string;
  lastname?: string;
  role: 'admin' | 'employee' | 'guest';
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  role?: 'admin' | 'employee' | 'guest';
}

export interface UpdateUserData {
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  role?: 'admin' | 'employee' | 'guest';
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupérer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFetch('/admin/users', { method: 'GET' });
      if (response.success) {
        setUsers(response.data);
      } else {
        setError(response.message || 'Erreur lors du chargement des utilisateurs');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  // Créer un utilisateur
  const createUser = async (userData: CreateUserData): Promise<boolean> => {
    try {
      setError(null);
      const response = await apiFetch('/admin/users', { 
        method: 'POST', 
        json: userData 
      });
      if (response.success) {
        await fetchUsers(); // Recharger la liste
        return true;
      } else {
        setError(response.message || 'Erreur lors de la création');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création');
      return false;
    }
  };

  // Mettre à jour un utilisateur
  const updateUser = async (id: number, userData: UpdateUserData): Promise<boolean> => {
    try {
      setError(null);
      const response = await apiFetch(`/admin/users/${id}`, { 
        method: 'PUT', 
        json: userData 
      });
      if (response.success) {
        await fetchUsers(); // Recharger la liste
        return true;
      } else {
        setError(response.message || 'Erreur lors de la mise à jour');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la mise à jour');
      return false;
    }
  };

  // Supprimer un utilisateur
  const deleteUser = async (id: number): Promise<boolean> => {
    try {
      setError(null);
      const response = await apiFetch(`/admin/users/${id}`, { 
        method: 'DELETE' 
      });
      if (response.success) {
        await fetchUsers(); // Recharger la liste
        return true;
      } else {
        setError(response.message || 'Erreur lors de la suppression');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression');
      return false;
    }
  };

  // Charger les utilisateurs au montage
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  };
}
