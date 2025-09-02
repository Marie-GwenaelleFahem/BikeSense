import React, { useState } from 'react';
import SensorCard from '../../components/SensorCard';
import useMockSensors from '../../hooks/useMockSensors';

const SensorList: React.FC = () => {
  const sensors = useMockSensors();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 

  // Utiliser tous les capteurs, pas seulement les températures
  const filteredData = sensors;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

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
      {/* Grille des capteurs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentData.map((sensor) => (
          <SensorCard key={sensor.id} type={sensor.type} value={sensor.value} timestamp={sensor.timestamp} />
        ))}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Affichage de {startIndex + 1} à {Math.min(endIndex, filteredData.length)} sur {filteredData.length} capteurs
          </div>
          
          <div className="flex items-center space-x-1">
            {renderPagination()}
          </div>
        </div>
      )}
    </div>
  );
};

export default SensorList;
