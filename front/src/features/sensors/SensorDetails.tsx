import React, { useState } from 'react';
import useMockSensors from '../../hooks/useMockSensors';

import type { Sensor } from '../../hooks/useMockSensors';

const SensorDetails: React.FC = () => {
  const sensors = useMockSensors();
  const [filter, setFilter] = useState<'all' | 'temperature' | 'humidity' | 'movement'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  const filteredData = filter === 'all' ? sensors : sensors.filter((item) => item.type === filter as Sensor['type']);

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Bouton "Précédent"
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Précédent
        </button>
      );
    }

    // Boutons de pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 text-sm font-medium rounded-md ${
            currentPage === i
              ? 'text-white bg-blue-600 border border-blue-600'
              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    // Bouton "Suivant"
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Suivant
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Historique des capteurs</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filtrer par type :</label>
        <select
          className="border rounded px-2 py-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'temperature' | 'humidity' | 'movement')}
        >
          <option value="all">Tous</option>
          <option value="temperature">Température</option>
          <option value="humidity">Humidité</option>
          <option value="movement">Mouvement</option>
        </select>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Type</th>
            <th className="border px-4 py-2 text-left">Valeur</th>
            <th className="border px-4 py-2 text-left">Horodatage</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 capitalize">{item.type}</td>
              <td className="border px-4 py-2">{item.value}</td> 
              <td className="border px-4 py-2">{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Informations de pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Affichage de {startIndex + 1} à {Math.min(endIndex, filteredData.length)} sur {filteredData.length} résultats
        </div>
        
        {/* Contrôles de pagination */}
        {totalPages > 1 && (
          <div className="flex items-center space-x-1">
            {renderPagination()}
          </div>
        )}
      </div>
    </div>
  );
};

export default SensorDetails;