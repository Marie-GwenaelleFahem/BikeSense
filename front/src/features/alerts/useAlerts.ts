import { useMemo } from 'react';
import type { Sensor } from '../../types/Sensor';    
import { useAlertSettings } from '../../context/AlertSettingsContext';

export interface Alert {
  type: 'température' | 'humidité' | 'mouvement';
  message: string;
  timestamp: string;
}

export const useAlerts = (sensors: Sensor[]): Alert[] => {
  const { tempLimit, humidityLimit, movementThreshold } = useAlertSettings();
  
  
  return useMemo(() => {
    const alerts: Alert[] = [];

    sensors.forEach((sensor) => {
      if (sensor.type === 'température' && parseInt(sensor.value) > tempLimit) {
        alerts.push({ type: 'température', message: `Température trop élevée (${sensor.value} > ${tempLimit}°C)`, timestamp: sensor.timestamp });
      }

      // Alerte de mouvement basée sur la vitesse (en km/h)
      if (sensor.type === 'mouvement') {
        const speedValue = sensor.value.replace('km/h', '').replace('kph', '');
        const speed = parseFloat(speedValue);
        
        // Alerte si vitesse détectée ET supérieure au seuil minimum
        if (!isNaN(speed) && speed > 0 && speed >= movementThreshold) {
          alerts.push({ type: 'mouvement', message: `Mouvement détecté : ${sensor.value} (≥ ${movementThreshold}km/h)`, timestamp: sensor.timestamp });
        }
      }

      if (sensor.type === 'humidité' && parseInt(sensor.value) > humidityLimit) {
        alerts.push({ type: 'humidité', message: `Taux d'humidité trop élevé (${sensor.value} > ${humidityLimit}%)`, timestamp: sensor.timestamp });
      }
    });

    return alerts;
  }, [sensors, tempLimit, humidityLimit, movementThreshold]);
};

export default useAlerts;
