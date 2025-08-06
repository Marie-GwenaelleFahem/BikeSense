import type { Sensor } from '../../hooks/useMockSensors';    

export interface Alert {
  type: 'température' | 'humidité' | 'mouvement';
  message: string;
}

const useAlerts = (sensors: Sensor[]): Alert[] => {
  const alerts: Alert[] = [];

  sensors.forEach((sensor) => {
    if (sensor.type === 'température' && parseInt(sensor.value) > 30) {
      alerts.push({ type: 'température', message: 'Température trop élevée' });
    }

    if (sensor.type === 'mouvement' && sensor.value !== 'Aucun mouvement') {
      alerts.push({ type: 'mouvement', message: `Mouvement détecté : ${sensor.value}` });
    }

    if (sensor.type === 'humidité' && parseInt(sensor.value) > 70) {
      alerts.push({ type: 'humidité', message: 'Humidité trop élevée' });
    }
  });

  return alerts;
};

export default useAlerts;
