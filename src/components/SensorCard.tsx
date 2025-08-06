import React from 'react';

interface SensorCardProps {
  type: 'température' | 'humidité' | 'mouvement';
  value: string;
}

const SensorCard: React.FC<SensorCardProps> = ({ type, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border">
      <h3 className="text-lg font-semibold capitalize">{type}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default SensorCard;