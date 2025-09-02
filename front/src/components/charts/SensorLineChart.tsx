import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import type { Sensor } from '../../hooks/useMockSensors';

interface SensorLineChartProps {
  type: 'température' | 'humidité' | 'mouvement';
  data: Sensor[];
}

const SensorLineChart: React.FC<SensorLineChartProps> = ({ type, data }) => {
  // Ne garder que les capteurs du bon type et convertir la valeur
  const chartData = data
    .filter((sensor) => sensor.type === type && !isNaN(parseFloat(sensor.value)))
    .map((sensor) => ({
      time: new Date(sensor.timestamp).toLocaleString(),
      value: parseFloat(sensor.value),
    }));

  if (chartData.length === 0) {
    return <p className="text-gray-500">No data available for {type}</p>;
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 capitalize">
        {type} au cours du temps
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" minTickGap={40} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorLineChart;
