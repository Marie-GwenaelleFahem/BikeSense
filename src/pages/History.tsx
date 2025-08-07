import React, { useState, useEffect } from 'react';
import useMockSensors from '../hooks/useMockSensors';

const SensorHistory: React.FC = () => {
  const sensors = useMockSensors();

  const [typeFilter, setTypeFilter] = useState<'all' | 'température' | 'humidité' | 'mouvement'>('all');
  const [threshold, setThreshold] = useState<number | ''>('');
  const [operator, setOperator] = useState<'>' | '<'>('>');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Historique des capteurs</h1>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block font-medium">Type de capteur</label>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as 'all' | 'température' | 'humidité' | 'mouvement')} className="w-full p-2 border rounded">
            <option value="all">Tous</option>
            <option value="température">Température</option>
            <option value="humidité">Humidité</option>
            <option value="mouvement">Mouvement</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Filtrer par valeur</label>
          <div className="flex gap-2">
            <select value={operator} onChange={(e) => setOperator(e.target.value as '>' | '<')} className="w-1/3 p-2 border rounded">
              <option value=">">Supérieur à</option>
              <option value="<">Inférieur à</option>
            </select>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value === '' ? '' : parseFloat(e.target.value))}
              className="w-2/3 p-2 border rounded"
              placeholder="Valeur"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Date de début</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Date de fin</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2 border rounded" />
        </div>
      </div>

      {/* Résultats */}
      <ul className="space-y-2">
        {currentSensors.length === 0 ? (
          <p>Aucune donnée ne correspond aux filtres.</p>
        ) : (
          currentSensors.map((sensor, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded border">
              <p><strong className="capitalize">{sensor.type}</strong> : {sensor.value}</p>
              <p className="text-sm text-gray-500">{new Date(sensor.timestamp).toLocaleString()}</p>
            </li>
          ))
        )}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white border text-gray-700'}`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SensorHistory;
