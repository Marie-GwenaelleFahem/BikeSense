import React, { useState } from 'react';
import useMockSensors from '../hooks/useMockSensors';
import SensorLineChart from '../components/charts/SensorLineChart';
import AlertStatsChart from '../components/charts/AlertStatsChart';
import SensorBarChart from '../components/charts/SensorBarChart';
import { BarChart3, TrendingUp, PieChart, Activity, Thermometer, Droplets } from 'lucide-react';

const Chart: React.FC = () => {
  const sensors = useMockSensors();
  const [activeTab, setActiveTab] = useState('line');

  const tabs = [
    { id: 'line', label: 'Graphiques linéaires', icon: TrendingUp },
    { id: 'bar', label: 'Graphiques en barres', icon: BarChart3 },
    { id: 'pie', label: 'Statistiques', icon: PieChart },
  ];

  const getChartData = (type: string) => {
    return sensors.filter(sensor => sensor.type === type);
  };

  return (
    <div className="min-h-screen p-6 space-y-8 animate-fade-in-up">
      {/* En-tête */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Graphiques et analyses</h1>
            <p className="text-gray-600">Visualisez vos données avec des graphiques interactifs</p>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenu des onglets */}
      <div className="space-y-8">
        {activeTab === 'line' && (
          <div className="space-y-8">
            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Thermometer className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Température</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {getChartData('température').length} mesures
                    </p>
                  </div>
                </div>
              </div>
              <div className="card p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Droplets className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Humidité</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {getChartData('humidité').length} mesures
                    </p>
                  </div>
                </div>
              </div>
              <div className="card p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Mouvement</p>
                    <p className="text-2xl font-bold text-green-600">
                      {getChartData('mouvement').length} mesures
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphiques linéaires */}
            <div className="space-y-8">
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Évolution de la température</h2>
                <SensorLineChart type="température" data={sensors} />
              </div>

              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Évolution de l'humidité</h2>
                <SensorLineChart type="humidité" data={sensors} />
              </div>

              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Activité de mouvement</h2>
                <SensorLineChart type="mouvement" data={sensors} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bar' && (
          <div className="space-y-8">
            {/* Graphiques en barres */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Répartition par type de capteur</h2>
                <SensorBarChart data={sensors} />
              </div>

              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Moyennes par type</h2>
                <div className="space-y-4">
                  {[
                    { type: 'température', icon: Thermometer, color: 'text-orange-600', bgColor: 'bg-orange-100' },
                    { type: 'humidité', icon: Droplets, color: 'text-blue-600', bgColor: 'bg-blue-100' },
                    { type: 'mouvement', icon: Activity, color: 'text-green-600', bgColor: 'bg-green-100' }
                  ].map((item) => {
                    const Icon = item.icon;
                    const data = getChartData(item.type);
                    const average = data.length > 0 
                      ? data.reduce((sum, sensor) => sum + parseFloat(sensor.value), 0) / data.length
                      : 0;

                    return (
                      <div key={item.type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${item.bgColor}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 capitalize">{item.type}</p>
                            <p className="text-sm text-gray-600">{data.length} mesures</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${item.color}`}>
                            {average.toFixed(1)}
                          </p>
                          <p className="text-sm text-gray-500">moyenne</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pie' && (
          <div className="space-y-8">
            {/* Statistiques et alertes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Statistiques des alertes</h2>
                <AlertStatsChart />
              </div>

              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Résumé des données</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{sensors.length}</p>
                      <p className="text-sm text-gray-600">Total des mesures</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {new Set(sensors.map(s => s.type)).size}
                      </p>
                      <p className="text-sm text-gray-600">Types de capteurs</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800">Répartition par type</h3>
                    {[
                      { type: 'température', color: 'bg-orange-500' },
                      { type: 'humidité', color: 'bg-blue-500' },
                      { type: 'mouvement', color: 'bg-green-500' }
                    ].map((item) => {
                      const count = getChartData(item.type).length;
                      const percentage = sensors.length > 0 ? (count / sensors.length) * 100 : 0;
                      
                      return (
                        <div key={item.type} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize text-gray-700">{item.type}</span>
                            <span className="font-medium text-gray-900">{count} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;
