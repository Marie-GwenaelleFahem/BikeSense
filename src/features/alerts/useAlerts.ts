import type { Sensor } from '../../hooks/useMockSensors';    

export interface Alert {
  type: 'température' | 'humidité' | 'mouvement';
  message: string;
  timestamp: string;
}

export const useAlerts = (sensors: Sensor[]): Alert[] => {
  const alerts: Alert[] = [];

  sensors.forEach((sensor) => {
    if (sensor.type === 'température' && parseInt(sensor.value) > 30) {
      alerts.push({ type: 'température', message: 'Température trop élevée', timestamp: sensor.timestamp });
    }

    if (sensor.type === 'mouvement' && sensor.value !== 'Aucun mouvement') {
      alerts.push({ type: 'mouvement', message: `Mouvement détecté : ${sensor.value}`, timestamp: sensor.timestamp });
    }

    if (sensor.type === 'humidité' && parseInt(sensor.value) > 70) {
      alerts.push({ type: 'humidité', message: 'Taux d\'humidité trop élevé', timestamp: sensor.timestamp });
    }
  });

  return alerts;
};

export default useAlerts;
