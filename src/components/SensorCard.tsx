import React from 'react';

interface SensorCardProps {
  type: 'temperature' | 'humidity' | 'movement';
  value: string;
  timestamp: string;
}

const SensorCard: React.FC<SensorCardProps> = ({ type, value, timestamp }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border">
      <h3 className="text-lg font-semibold capitalize">{type}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-sm text-gray-500">{new Date(timestamp).toLocaleString()}</p>
        </div>
  );
};

export default SensorCard;