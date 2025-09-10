import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function RequireAuth() {
  const { user, isLoadingUser } = useAuth();
  const location = useLocation();

  if (isLoadingUser) return <div>Chargement...</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
}

