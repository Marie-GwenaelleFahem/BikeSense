import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useAuth } from '../../context/AuthContext';

export function useAuthStatus() {
  const isAuthenticated = useIsAuthenticated();
  const { user, isLoadingUser, login, logout, refreshMe } = useAuth();
  return {
    isAuthenticated: Boolean(isAuthenticated()),
    user,
    isLoadingUser,
    login,
    logout,
    refreshMe,
  };
}
