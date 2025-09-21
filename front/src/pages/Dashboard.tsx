import React from 'react';
import SensorList from '../features/sensors/SensorList';
import AlertList from '../features/alerts/AlertList';
import useStats from '../hooks/useStats';
import useHistoricalData from '../hooks/useHistoricalData';
import useAlerts from '../features/alerts/useAlerts';
import { TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { stats, loading: statsLoading, error: statsError } = useStats();
  const { sensors } = useHistoricalData();
  const allAlerts = useAlerts(sensors);
  
  // Filtrer les alertes de cette semaine
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Dimanche
  
  const alertsThisWeek = allAlerts.filter(alert => {
    const alertDate = new Date(alert.timestamp);
    return alertDate >= startOfWeek;
  });


  return (
    <div className="min-h-screen p-6 space-y-8 animate-fade-in-up">
      {/* En-tête du dashboard */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
            <p className="text-gray-600">Surveillance en temps réel de vos capteurs</p>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {statsLoading ? (
          // État de chargement
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card p-6 bg-gray-50 border border-gray-200 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-8 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
              </div>
            </div>
          ))
        ) : statsError ? (
          // État d'erreur
          <div className="col-span-3 card p-6 bg-red-50 border border-red-200">
            <p className="text-red-600">❌ Erreur de chargement des statistiques : {statsError}</p>
          </div>
        ) : (
          // Données réelles
          stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`card hover-lift p-6 ${stat.bgColor} border border-gray-200`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Section des capteurs */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Capteurs</h2>
            <div className="flex items-center space-x-2">
              <span className="status-indicator status-online"></span>
              <span className="text-sm text-gray-600">Tous les capteurs en ligne</span>
            </div>
          </div>
          <div className="card p-6">
            <SensorList />
          </div>
        </div>

        {/* Section des alertes */}
        <div className="lg:col-span-3 space-y-6 ">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Alertes récentes</h2>
            <div className="flex items-center space-x-2">
              <span className={`status-indicator ${alertsThisWeek.length > 0 ? 'status-danger animate-pulse-slow' : 'status-success'}`}></span>
              <span className={`text-sm font-medium ${alertsThisWeek.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {alertsThisWeek.length} alerte{alertsThisWeek.length !== 1 ? 's' : ''} cette semaine
              </span>
            </div>
          </div>
          <div className="card p-6">
            <AlertList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
