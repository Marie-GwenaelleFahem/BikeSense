import React from 'react';
import useMockSensors from '../hooks/useMockSensors';
import SensorLineChart from '../components/charts/SensorLineChart';

import AlertStatsChart from '../components/charts/AlertStatsChart';

const Chart: React.FC = () => {
  const sensors = useMockSensors();

  return (
    <div className="space-y-10 p-6">
      <h1 className="text-2xl font-bold">Graphiques des données des capteurs</h1>

      <SensorLineChart type="température" data={sensors} />
      <SensorLineChart type="humidité" data={sensors} />
      <SensorLineChart type="mouvement" data={sensors} />
      <AlertStatsChart />
    </div>
  );
};

export default Chart;
