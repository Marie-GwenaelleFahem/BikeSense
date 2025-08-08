import React, { useState, useEffect } from 'react';
import useMockSensors from '../../hooks/useMockSensors';
import useAlerts from './useAlerts';
import { AlertTriangle, AlertCircle, Info, X, Filter, } from 'lucide-react';

const AlertList: React.FC = () => {
  const sensors = useMockSensors();
  const allAlerts = useAlerts(sensors);
  const [filterType, setFilterType] = useState<'all' | 'température' | 'humidité' | 'mouvement'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredAlerts = filterType === 'all'
    ? allAlerts
    : allAlerts.filter((alert) => alert.type === filterType);

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlerts = filteredAlerts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'température':
        return {
          icon: AlertTriangle,
          color: 'from-red-500 to-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          severity: 'Critique'
        };
      case 'humidité':
        return {
          icon: AlertCircle,
          color: 'from-orange-500 to-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-800',
          severity: 'Avertissement'
        };
      case 'mouvement':
        return {
          icon: Info,
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          severity: 'Info'
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'from-gray-500 to-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          severity: 'Info'
        };
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Précédent
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
            currentPage === i
              ? 'text-white bg-blue-600 border border-blue-600 shadow-md'
              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Suivant
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="flex space-x-1">
        <div className="flex justify-end space-x-2 w-full">
          <span className="status-indicator status-danger animate-pulse-slow"></span>
          <span className="text-sm font-medium text-red-600">{filteredAlerts.length} alertes</span>
        </div>
      </div>

      {/* Filtres */}
      <div className="card p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Filtrer par type :</label>
          </div>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'température' | 'humidité' | 'mouvement')}
          >
            <option value="all">Toutes les alertes</option>
            <option value="température">Température</option>
            <option value="humidité">Humidité</option>
            <option value="mouvement">Mouvement</option>
          </select>
        </div>
      </div>

      {/* Liste des alertes */}
      {filteredAlerts.length === 0 ? (
        <div className="card p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-green-100 rounded-full">
              <X className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Aucune alerte</h3>
              <p className="text-gray-600">Tout fonctionne correctement !</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {currentAlerts.map((alert, index) => {
            const config = getAlertConfig(alert.type);
            const Icon = config.icon;
            
            return (
              <div key={index} className={`card p-4 border ${config.borderColor} ${config.bgColor} animate-slide-in`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${config.color} shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-semibold ${config.textColor} capitalize`}>
                          {alert.type}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          config.severity === 'Critique' ? 'bg-red-100 text-red-800' :
                          config.severity === 'Avertissement' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {config.severity}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(alert.timestamp).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className={`text-sm ${config.textColor} font-medium`}>
                      {alert.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
    </div>
  );
};

export default AlertList;
