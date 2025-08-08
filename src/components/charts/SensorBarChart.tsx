import React from 'react';
import type { Sensor } from '../../types/Sensor';

interface SensorBarChartProps {
  data: Sensor[];
}

const SensorBarChart: React.FC<SensorBarChartProps> = ({ data }) => {
  // Calculer les statistiques par type de capteur
  const stats = data.reduce((acc, sensor) => {
    if (!acc[sensor.type]) {
      acc[sensor.type] = { count: 0, total: 0 };
    }
    acc[sensor.type].count += 1;
    acc[sensor.type].total += parseFloat(sensor.value);
    return acc;
  }, {} as Record<string, { count: number; total: number }>);

  const maxCount = Math.max(...Object.values(stats).map(s => s.count));

  return (
    <div className="space-y-4">
      {Object.entries(stats).map(([type, { count, total }]) => {
        const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
        const average = count > 0 ? total / count : 0;
        
        let colorClass = 'bg-gray-500';
        if (type === 'température') colorClass = 'bg-orange-500';
        else if (type === 'humidité') colorClass = 'bg-blue-500';
        else if (type === 'mouvement') colorClass = 'bg-green-500';

        return (
          <div key={type} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 capitalize">{type}</span>
              <span className="text-sm text-gray-500">{count} mesures</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${colorClass} transition-all duration-300`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500">
              Moyenne: {average.toFixed(1)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SensorBarChart;
