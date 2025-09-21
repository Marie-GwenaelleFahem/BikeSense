import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Afficher la navbar seulement si l'utilisateur est connecté */}
      {user && <Navbar />}
      <main className={user ? "p-6" : ""}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;