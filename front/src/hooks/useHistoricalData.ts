import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

export interface HistoricalSensor {
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

export function useHistoricalData() {
  const [sensors, setSensors] = useState<HistoricalSensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Récupérer toutes les données des 3 types de capteurs
        const [tempResponse, humidityResponse, movementResponse] = await Promise.all([
          apiFetch('/temperature', { method: 'GET' }),
          apiFetch('/humidity', { method: 'GET' }),
          apiFetch('/movement', { method: 'GET' })
        ]);

        const allSensorData: HistoricalSensor[] = [];

        // Traiter les données de température
        if (tempResponse.success && tempResponse.data) {
          const tempData = Array.isArray(tempResponse.data) ? tempResponse.data : [tempResponse.data];
          tempData.forEach((temp: any) => {
            allSensorData.push({
              id: temp.id,
              type: 'température',
              value: `${temp.value}°C`,
              timestamp: temp.date,
              rawValue: temp.value
            });
          });
        }

        // Traiter les données d'humidité
        if (humidityResponse.success && humidityResponse.data) {
          const humidityData = Array.isArray(humidityResponse.data) ? humidityResponse.data : [humidityResponse.data];
          humidityData.forEach((humidity: any) => {
            allSensorData.push({
              id: humidity.id + 10000, // Éviter les conflits d'ID
              type: 'humidité',
              value: `${humidity.value}%`,
              timestamp: humidity.date,
              rawValue: humidity.value
            });
          });
        }

        // Traiter les données de mouvement
        if (movementResponse.success && movementResponse.data) {
          const movementData = Array.isArray(movementResponse.data) ? movementResponse.data : [movementResponse.data];
          movementData.forEach((movement: any) => {
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
              displayValue = movement.state || 'N/A';
              numericValue = 0;
            }

            allSensorData.push({
              id: movement.id + 20000, // Éviter les conflits d'ID
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
          });
        }

        // Trier par timestamp (plus récent en premier)
        allSensorData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        setSensors(allSensorData);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement des données historiques');
        console.error('Erreur useHistoricalData:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, []);

  return { sensors, loading, error, refetch: () => window.location.reload() };
}

export default useHistoricalData;
