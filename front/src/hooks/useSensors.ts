import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

export interface RealSensor {
  id: number;
  type: 'température' | 'humidité' | 'mouvement';
  value: string;
  timestamp: string;
  rawValue?: number;
  state?: string;
  move_duration?: number;
  x_axis?: number;
  y_axis?: number;
  z_axis?: number;
}

export function useRealSensors() {
  const [sensors, setSensors] = useState<RealSensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Récupérer les données des 3 types de capteurs en parallèle
        const [tempResponse, humidityResponse, movementResponse] = await Promise.all([
          apiFetch('/temperature/latest', { method: 'GET' }),
          apiFetch('/humidity/latest', { method: 'GET' }),
          apiFetch('/movement/latest', { method: 'GET' })
        ]);

        const sensorData: RealSensor[] = [];

        // Traiter les données de température
        if (tempResponse.success && tempResponse.data) {
          sensorData.push({
            id: tempResponse.data.id,
            type: 'température',
            value: `${tempResponse.data.value}°C`,
            timestamp: tempResponse.data.date,
            rawValue: tempResponse.data.value
          });
        }

        // Traiter les données d'humidité
        if (humidityResponse.success && humidityResponse.data) {
          sensorData.push({
            id: humidityResponse.data.id + 1000, // Éviter les conflits d'ID
            type: 'humidité',
            value: `${humidityResponse.data.value}%`,
            timestamp: humidityResponse.data.date,
            rawValue: humidityResponse.data.value
          });
        }

        // Traiter les données de mouvement
        if (movementResponse.success && movementResponse.data) {
          const movement = movementResponse.data;
          let displayValue: string;
          let numericValue: number;
          
          if (movement.state === 'stationary') {
            displayValue = '0km/h';
            numericValue = 0;
          } else if (movement.state === 'start-moving' || movement.state === 'stop-moving') {
            // Calculer une vitesse approximative basée sur les axes
            const speed = Math.sqrt(
              Math.pow(movement.x_axis || 0, 2) + 
              Math.pow(movement.y_axis || 0, 2) + 
              Math.pow(movement.z_axis || 0, 2)
            ) / 10; // Facteur d'échelle arbitraire
            numericValue = speed;
            displayValue = `${speed.toFixed(1)}km/h`;
          } else {
            displayValue = movement.state;
            numericValue = 0;
          }

          sensorData.push({
            id: movement.id + 2000, // Éviter les conflits d'ID
            type: 'mouvement',
            value: displayValue,
            timestamp: movement.date,
            rawValue: numericValue, // Valeur numérique pour les calculs
            state: movement.state,
            move_duration: movement.move_duration,
            x_axis: movement.x_axis,
            y_axis: movement.y_axis,
            z_axis: movement.z_axis
          });
        }

        // Trier par timestamp (plus récent en premier)
        sensorData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        setSensors(sensorData);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement des données');
        console.error('Erreur useRealSensors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();

    // Actualiser toutes les 30 secondes
    const interval = setInterval(fetchSensorData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { sensors, loading, error, refetch: () => window.location.reload() };
}

export default useRealSensors;
