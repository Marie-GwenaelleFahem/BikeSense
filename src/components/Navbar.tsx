import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, History, ChartBar, Settings, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">
        <Link to="/dashboard">BikeSense</Link>
      </h1>
      <nav className="space-x-2  flex items-center">
        <Link to="/alerts" className="text-gray-700 hover:underline flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Alertes
        </Link>
        <Link to="/history" className="text-gray-700 hover:underline flex items-center gap-2">
          <History className="w-4 h-4" />
          Historique
        </Link>
        <Link to="/chart" className="text-gray-700 hover:underline flex items-center gap-2">
          <ChartBar className="w-4 h-4" />
          Graphiques
        </Link>
        {/* si Admin ici on gere les utilisateurs et on peut modifier les limites des capteurs
        pour les alertes */}
        <Link to="/settings" className="text-gray-700 hover:underline flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Paramètres
        </Link>
        {/* TODO: Add logout button */}
            <Link to="/login" className="text-gray-700 hover:underline flex items-center gap-2 bg-red-500 rounded-md p-2 text-white hover:bg-red-600 transition-colors duration-300 cursor-pointer">
          <LogOut className="w-4 h-4" />
          Deconnexion
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;