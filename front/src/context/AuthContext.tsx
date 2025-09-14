import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiFetch } from '../services/api';

type User = { id: number; email: string; firstname?: string; lastname?: string };

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

  const refreshMe = useCallback(async () => {
    try {
      const response = await apiFetch('/auth/me', { method: 'GET' });
      setUser(response as User);
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
    } catch (error: any) {
      console.error('Erreur de connexion:', error?.message || error || 'Erreur inconnue');
      throw error; // Relancer l'erreur pour que le composant Login puisse l'attraper
    }
  }, [refreshMe]);

  const logout = useCallback(async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
    }
  }, []);

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