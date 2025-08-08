import React from 'react';
import SensorList from '../features/sensors/SensorList';
import AlertList from '../features/alerts/AlertList';
import useMockSensors from '../hooks/useMockSensors';
import useMockStats from '../hooks/useMockStats';
import { TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const sensors = useMockSensors();
  const stats = useMockStats();


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
        {stats.map((stat, index) => {
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
        })}
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
            <SensorList sensors={sensors} className="w-full" />
          </div>
        </div>

        {/* Section des alertes */}
        <div className="lg:col-span-3 space-y-6 ">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Alertes récentes</h2>
            <div className="flex items-center space-x-2">
              <span className="status-indicator status-danger animate-pulse-slow"></span>
              <span className="text-sm text-red-600 font-medium">3 alertes actives</span>
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
