import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiFetch } from '../services/api';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

type User = { id: string; email: string; firstname?: string; lastname?: string };

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
  const signIn = useSignIn();
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser<User>();

  const refreshMe = useCallback(async () => {
    try {
      const me = await apiFetch('/auth/me', { method: 'GET' });
      setUser(me as User);
    } catch (e: any) {
      console.error('Erreur refreshMe:', e.message || e);
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
      // store minimal flag in react-auth-kit so ProtectedRoute works
      signIn({
        token: 'cookie', // placeholder, we rely on httpOnly cookie at server
        expiresIn: 60 * 24 * 7,
        tokenType: 'Bearer',
        authState: { email },
      });
      await refreshMe();
    } catch (error: any) {
      console.error('Erreur de connexion:', error.message || error);
      throw error; // Relancer l'erreur pour que le composant Login puisse l'attraper
    }
  }, [refreshMe, signIn]);

  const logout = useCallback(async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
      signOut();
    }
  }, [signOut]);

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