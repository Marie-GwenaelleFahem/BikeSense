import React, { useState } from 'react';
import useMockSensors from '../../hooks/useMockSensors';
import useAlerts from './useAlerts';

const AlertList: React.FC = () => {
  const sensors = useMockSensors();
  const allAlerts = useAlerts(sensors);
  const [filterType, setFilterType] = useState<'tous' | 'température' | 'humidité' | 'mouvement'>('tous');

  const filteredAlerts = filterType === 'tous'
    ? allAlerts
    : allAlerts.filter((alert) => alert.type === filterType);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Alertes</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filtrer par type :</label>
        <select
          className="border rounded px-2 py-1"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
        >
          <option value="tous">Tous</option>
          <option value="température">Température</option>
          <option value="humidité">Humidité</option>
          <option value="mouvement">Mouvement</option>
        </select>
      </div>

      {filteredAlerts.length === 0 ? (
        <p>Aucune alerte pour ce filtre.</p>
      ) : (
        <ul className="space-y-2">
          {filteredAlerts.map((alert, index) => (
            <li key={index} className="bg-red-100 border border-red-300 text-red-800 p-3 rounded">
              <strong className="capitalize">{alert.type}</strong> – {alert.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertList;
