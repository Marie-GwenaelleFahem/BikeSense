import { useAuth } from '../../context/AuthContext';

export function useAuthStatus() {
  const { user, isLoadingUser, login, logout, refreshMe } = useAuth();
  return {
    isAuthenticated: Boolean(user),
    user,
    isLoadingUser,
    login,
    logout,
    refreshMe,
  };
}
