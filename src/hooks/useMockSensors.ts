import { useEffect, useState } from 'react';
import type { Sensor } from '../types/Sensor';

export const useMockSensors = () => {
  const [sensors, setSensors] = useState<Sensor[]>([
    { type: 'température', value: '22°C' },
    { type: 'humidité', value: '45%' },
    { type: 'mouvement', value: 'Aucun mouvement' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValues = sensors.map((sensor) => ({
        ...sensor,
        value:
          sensor.type === 'température'
            ? `${20 + Math.floor(Math.random() * 5)}°C`
            : sensor.type === 'humidité'
            ? `${40 + Math.floor(Math.random() * 10)}%`
            : Math.random() > 0.8
            ? 'Mouvement détecté'
            : 'Aucun mouvement',
      }));

      setSensors(newValues);
    }, 3000);

    return () => clearInterval(interval);
  }, [sensors]);

  return sensors;
};