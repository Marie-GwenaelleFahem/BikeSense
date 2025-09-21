import { useState, useEffect } from 'react';
import { AlertTriangle, Thermometer, Activity } from 'lucide-react';
import { apiFetch } from '../services/api';
import useMovementStats from './useMovementStats';

interface Stat {
  title: string;
  value: string;
  icon: any;
  color: string;
  bgColor: string;
  textColor: string;
}

export function useRealStats() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { stats: movementStats, loading: movementLoading } = useMovementStats();

  useEffect(() => {
    const fetchRealStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Définir une période pour les statistiques (dernier mois)
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 jours avant
        
        const startParam = startDate.toISOString();
        const endParam = endDate.toISOString();

        // Récupérer les données agrégées des capteurs avec paramètres requis
        const [tempStats, humidityStats] = await Promise.all([
          apiFetch(`/temperature/aggregate?start=${encodeURIComponent(startParam)}&end=${encodeURIComponent(endParam)}`, { method: 'GET' }),
          apiFetch(`/humidity/aggregate?start=${encodeURIComponent(startParam)}&end=${encodeURIComponent(endParam)}`, { method: 'GET' })
        ]);

        const realStats: Stat[] = [];

        // Statistiques de température
        if (tempStats.success && tempStats.data) {
          realStats.push({
            title: "Température moyenne",
            value: `${tempStats.data.avg?.toFixed(1) || 'N/A'}°C`,
            icon: Thermometer,
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            textColor: "text-blue-600"
          });
        }

        // Statistiques d'humidité
        if (humidityStats.success && humidityStats.data) {
          realStats.push({
            title: "Taux d'humidité moyen",
            value: `${humidityStats.data.avg?.toFixed(1) || 'N/A'}%`,
            icon: Activity,
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            textColor: "text-purple-600"
          });
        }

        // Statistique de mouvement (vitesse moyenne)
        if (movementStats && !movementLoading) {
          realStats.push({
            title: "Vitesse moyenne",
            value: `${movementStats.averageSpeed}km/h`,
            icon: Activity,
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            textColor: "text-green-600"
          });
        }

        // Statistique d'alertes (simulée pour l'instant)
        realStats.unshift({
          title: "Alertes actives",
          value: "0", // TODO: Implémenter un système d'alertes basé sur les seuils
          icon: AlertTriangle,
          color: "from-red-500 to-red-600",
          bgColor: "bg-red-50",
          textColor: "text-red-600"
        });

        setStats(realStats);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement des statistiques');
        console.error('Erreur useRealStats:', err);
        
        // Fallback vers des statistiques par défaut en cas d'erreur
        setStats([
          {
            title: "Alertes actives",
            value: "N/A",
            icon: AlertTriangle,
            color: "from-red-500 to-red-600",
            bgColor: "bg-red-50",
            textColor: "text-red-600"
          },
          {
            title: "Température",
            value: "N/A",
            icon: Thermometer,
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            textColor: "text-blue-600"
          },
          {
            title: "Humidité",
            value: "N/A",
            icon: Activity,
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            textColor: "text-purple-600"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRealStats();

    // Actualiser toutes les minutes
    const interval = setInterval(fetchRealStats, 60000);
    return () => clearInterval(interval);
  }, []);

  return { stats, loading, error };
}

export default useRealStats;
