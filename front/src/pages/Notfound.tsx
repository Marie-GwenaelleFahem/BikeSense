import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

const Notfound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in-up">
        {/* Icône d'erreur */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
              <AlertTriangle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">4</span>
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">4</span>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Page non trouvée</h2>
          <p className="text-gray-600">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="btn-primary flex items-center justify-center space-x-2 w-full"
          >
            <Home className="w-5 h-5" />
            <span>Retour au tableau de bord</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Page précédente</span>
          </button>
        </div>

        {/* Informations supplémentaires */}
        <div className="text-sm text-gray-500 space-y-2">
          <p>Si vous pensez qu'il s'agit d'une erreur,</p>
          <p>contactez l'administrateur du système.</p>
        </div>
      </div>
    </div>
  );
};

export default Notfound;