import React, { useState, useEffect } from 'react';
import useMockSensors from '../../hooks/useMockSensors';
import useAlerts from './useAlerts';

const AlertList: React.FC = () => {
  const sensors = useMockSensors();
  const allAlerts = useAlerts(sensors);
  const [filterType, setFilterType] = useState<'all' | 'temperature' | 'humidity' | 'movement'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 5 alertes par page

  const filteredAlerts = filterType === 'all'
    ? allAlerts
    : allAlerts.filter((alert) => alert.type === filterType);

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlerts = filteredAlerts.slice(startIndex, endIndex);

  // Réinitialiser la page courante quand le filtre change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

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
      <h1 className="text-2xl font-bold">Alertes</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filtrer par type :</label>
        <select
          className="border rounded px-2 py-1"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as 'all' | 'temperature' | 'humidity' | 'movement')}
        >
          <option value="all">Tous</option>
          <option value="temperature">Température</option>
          <option value="humidity">Humidité</option>
          <option value="movement">Mouvement</option>
        </select>
      </div>

      {filteredAlerts.length === 0 ? (
        <p>Aucune alerte pour ce filtre.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {currentAlerts.map((alert, index) => (
              <li key={index} className="bg-red-100 border border-red-300 text-red-800 p-3 rounded">
                <strong className="capitalize">{alert.type}</strong> – {alert.message}
                <p className="text-sm text-gray-500">{new Date(alert.timestamp).toLocaleString()}</p>
              </li>   
            ))}
          </ul>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700">
                Affichage de {startIndex + 1} à {Math.min(endIndex, filteredAlerts.length)} sur {filteredAlerts.length} alertes
              </div>
              
              <div className="flex items-center space-x-1">
                {renderPagination()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AlertList;
