import React, { useState, useEffect } from 'react';
import useHistoricalData from '../hooks/useHistoricalData';
import { Calendar, Filter, Download, BarChart3, TrendingUp, Clock, Thermometer, Droplets, Activity } from 'lucide-react';

const SensorHistory: React.FC = () => {
  const { sensors } = useHistoricalData();

  const [typeFilter, setTypeFilter] = useState<'all' | 'température' | 'humidité' | 'mouvement'>('all');
  const [threshold, setThreshold] = useState<number | ''>('');
  const [operator, setOperator] = useState<'>' | '<'>('>');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');
  const itemsPerPage = 10;

  const filteredSensors = sensors.filter((sensor) => {
    if (typeFilter !== 'all' && sensor.type !== typeFilter) return false;
    const numericValue = parseFloat(sensor.value);
    if (!isNaN(numericValue) && threshold !== '') {
      if (operator === '>' && !(numericValue > threshold)) return false;
      if (operator === '<' && !(numericValue < threshold)) return false;
    }
    const timestamp = new Date(sensor.timestamp);
    if (startDate && timestamp < new Date(startDate)) return false;
    if (endDate && timestamp > new Date(endDate)) return false;
    return true;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, threshold, operator, startDate, endDate]);

  const totalPages = Math.ceil(filteredSensors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSensors = filteredSensors.slice(startIndex, endIndex);

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'température':
        return Thermometer;
      case 'humidité':
        return Droplets;
      case 'mouvement':
        return Activity;
      default:
        return Thermometer;
    }
  };

  const getSensorColor = (type: string) => {
    switch (type) {
      case 'température':
        return 'text-orange-600 bg-orange-100';
      case 'humidité':
        return 'text-blue-600 bg-blue-100';
      case 'mouvement':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
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
          onClick={() => setCurrentPage(currentPage - 1)}
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
          onClick={() => setCurrentPage(i)}
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
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Suivant
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="min-h-screen p-6 space-y-8 animate-fade-in-up">
      {/* En-tête */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Historique des capteurs</h1>
              <p className="text-gray-600">Consultez l'historique complet de vos données</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'chart' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Température</p>
              <p className="text-2xl font-bold text-orange-600">
                {filteredSensors.filter(s => s.type === 'température').length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Thermometer className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Humidité</p>
              <p className="text-2xl font-bold text-blue-600">
                {filteredSensors.filter(s => s.type === 'humidité').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Droplets className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mouvement</p>
              <p className="text-2xl font-bold text-green-600">
                {filteredSensors.filter(s => s.type === 'mouvement').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="card p-6 bg-white shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Filter className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Filtres avancés</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de capteur
            </label>
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value as 'all' | 'température' | 'humidité' | 'mouvement')} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none hover:border-blue-400"
            >
              <option value="all" className="py-2">Tous les types</option>
              <option value="température" className="py-2">Température</option>
              <option value="humidité" className="py-2">Humidité</option>
              <option value="mouvement" className="py-2">Mouvement</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-8">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtre par valeur
            </label>
            <div className="flex gap-2">
              <select 
                value={operator} 
                onChange={(e) => setOperator(e.target.value as '>' | '<')} 
                className="w-1/3 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              >
                <option value=">">Supérieur à</option>
                <option value="<">Inférieur à</option>
              </select>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-2/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Valeur"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de début
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de fin
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Résultats</h2>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>

        {currentSensors.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucune donnée trouvée</h3>
            <p className="text-gray-600">Aucune donnée ne correspond aux filtres sélectionnés.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentSensors.map((sensor, index) => {
              const Icon = getSensorIcon(sensor.type);
              const colorClass = getSensorColor(sensor.type);
              
              return (
                <div key={index} className="card p-4 hover-lift">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 capitalize">{sensor.type}</h3>
                        <p className="text-2xl font-bold text-gray-900">{sensor.value}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(sensor.timestamp).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
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
          <div className="flex items-center justify-between mt-8">
            <div className="text-sm text-gray-700">
              Affichage de {startIndex + 1} à {Math.min(endIndex, filteredSensors.length)} sur {filteredSensors.length} enregistrements
            </div>
            
            <div className="flex items-center space-x-1">
              {renderPagination()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SensorHistory;
