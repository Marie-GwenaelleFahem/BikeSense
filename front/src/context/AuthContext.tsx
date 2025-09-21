import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiFetch } from '../services/api';
import { useToastHelpers } from '../components/Toast';

type User = { id: number; email: string; firstname?: string; lastname?: string; role: 'admin' | 'employee' | 'guest'; };

type AuthContextValue = {
  user: User | null;
  isLoadingUser: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const { success, error } = useToastHelpers();

  const refreshMe = useCallback(async () => {
    try {
      const response = await apiFetch('/auth/me', { method: 'GET' });
      // L'API retourne {success: true, data: {...}}, on extrait les données
      const userData = response.data || response;
      setUser(userData as User);
    } catch (e: any) {
      console.error('Erreur refreshMe:', e?.message || e || 'Erreur inconnue');
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      await apiFetch('/auth/login', { method: 'POST', json: { email, password } });
      await refreshMe();
      success('Connexion réussie', 'Bienvenue dans BikeSense !');
    } catch (err: any) {
      console.error('Erreur de connexion:', err?.message || err || 'Erreur inconnue');
      
      // Gestion spécifique des erreurs selon le type
      const errorMessage = err?.message || 'Erreur de connexion';
      const errorType = err?.errorType;
      
      switch (errorType) {
        case 'EMAIL_REQUIRED':
          error('Email requis', 'Veuillez saisir votre adresse email');
          break;
        case 'PASSWORD_REQUIRED':
          error('Mot de passe requis', 'Veuillez saisir votre mot de passe');
          break;
        case 'EMAIL_NOT_FOUND':
          error('Email introuvable', 'Aucun compte n\'est associé à cet email');
          break;
        case 'INVALID_PASSWORD':
          error('Mot de passe incorrect', 'Le mot de passe saisi est incorrect');
          break;
        default:
          error('Erreur de connexion', errorMessage);
      }
      
      throw err; // Relancer l'erreur pour que le composant Login puisse l'attraper
    }
  }, [refreshMe, success, error]);

  const logout = useCallback(async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
      success('Déconnexion réussie', 'À bientôt !');
    } catch (error: any) {
      console.error('Erreur de déconnexion:', error);
      error('Erreur de déconnexion', 'Une erreur est survenue lors de la déconnexion');
    } finally {
      setUser(null);
    }
  }, [success, error]);

  return (
    <AuthContext.Provider value={{ user, isLoadingUser, login, logout, refreshMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}