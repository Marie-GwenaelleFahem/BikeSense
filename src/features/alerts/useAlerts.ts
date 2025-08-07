import type { Sensor } from '../../hooks/useMockSensors';    

export interface Alert {
  type: 'temperature' | 'humidity' | 'movement';
  message: string;
  timestamp: string;
}

export const useAlerts = (sensors: Sensor[]): Alert[] => {
  const alerts: Alert[] = [];

  sensors.forEach((sensor) => {
    if (sensor.type === 'temperature' && parseInt(sensor.value) > 30) {
      alerts.push({ type: 'temperature', message: 'Température trop élevée', timestamp: sensor.timestamp });
    }

    if (sensor.type === 'movement' && sensor.value !== 'Aucun mouvement') {
      alerts.push({ type: 'movement', message: `Mouvement détecté : ${sensor.value}`, timestamp: sensor.timestamp });
    }

    if (sensor.type === 'humidity' && parseInt(sensor.value) > 70) {
      alerts.push({ type: 'humidity', message: 'Taux d\'humidité trop élevé', timestamp: sensor.timestamp });
    }
  });

  return alerts;
};

export default useAlerts;
