import React from 'react';
import { Link } from 'react-router-dom';
 // TODO: Add auth context


const Notfound: React.FC = () => {


  return (
    <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-4xl font-bold">404 - Page non trouvée</h1>
      <p className="text-lg">La page que vous cherchez n'existe pas.</p>
      <Link to="/dashboard" className="text-blue-500 hover:text-blue-700">Retour au dashboard</Link>
{/* TODO: Add auth context and add user to the form       
{user.role === 'admin' || user.role === 'employee' ? (
        <Link to="/dashboard" className="text-blue-500 hover:text-blue-700">Retour au dashboard</Link>
      ) : (
        <Link to="/login" className="text-blue-500 hover:text-blue-700">Retour à la page de connexion</Link>
      )} */}
    </div>
  );
};

export default Notfound;