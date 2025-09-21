import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

export interface MovementStats {
  averageSpeed: number;
  totalMovements: number;
  stationaryTime: number;
  activeTime: number;
}

export function useMovementStats() {
  const [stats, setStats] = useState<MovementStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovementStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Récupérer toutes les données de mouvement
        const response = await apiFetch('/movement', { method: 'GET' });

        if (response.success && response.data) {
          const movements = Array.isArray(response.data) ? response.data : [response.data];
          
          let totalSpeed = 0;
          let speedCount = 0;
          let stationaryCount = 0;
          let activeCount = 0;

          movements.forEach((movement: any) => {
            if (movement.state === 'stationary') {
              totalSpeed += 0; // 0km/h
              speedCount++;
              stationaryCount++;
            } else if (movement.state === 'start-moving' || movement.state === 'stop-moving') {
              // Calculer la vitesse basée sur les axes
              const speed = Math.sqrt(
                Math.pow(movement.x_axis || 0, 2) + 
                Math.pow(movement.y_axis || 0, 2) + 
                Math.pow(movement.z_axis || 0, 2)
              ) / 10;
              
              totalSpeed += speed;
              speedCount++;
              activeCount++;
            }
          });

          const averageSpeed = speedCount > 0 ? totalSpeed / speedCount : 0;

          setStats({
            averageSpeed: parseFloat(averageSpeed.toFixed(1)),
            totalMovements: movements.length,
            stationaryTime: stationaryCount,
            activeTime: activeCount
          });
        }
      } catch (err: any) {
        setError(err.message || 'Erreur lors du calcul des statistiques de mouvement');
        console.error('Erreur useMovementStats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovementStats();
  }, []);

  return { stats, loading, error };
}

export default useMovementStats;
