import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">
        <Link to="/dashboard">BikeSense</Link>
      </h1>
      <nav className="space-x-4">
        {/* si Admin ici on gere les utilisateurs et on peut modifier les limites des capteurs
        pour les alertes */}
        <Link to="/settings" className="text-gray-700 hover:underline">
          Paramètres
        </Link>
        {/* TODO: Add logout button */}
        <Link to="/login" className="text-gray-700 hover:underline">
          Deconnexion
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;