import React from 'react';
import SensorCard from '../../components/SensorCard';
import useMockSensors from '../../hooks/useMockSensors';

const SensorList: React.FC = () => {
  const sensors = useMockSensors();

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sensors.map((sensor, index) => (
        <SensorCard key={index} type={sensor.type} value={sensor.value} />
      ))}
    </section>
  );
};

export default SensorList;
