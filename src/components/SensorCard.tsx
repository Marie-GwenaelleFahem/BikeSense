import React from 'react';
import { Thermometer, Droplets, Activity, Clock } from 'lucide-react';

interface SensorCardProps {
  type: 'température' | 'humidité' | 'mouvement';
  value: string;
  timestamp: string;
}

const SensorCard: React.FC<SensorCardProps> = ({ type, value, timestamp }) => {
  const getSensorConfig = (type: string) => {
    switch (type) {
      case 'température':
        return {
          icon: Thermometer,
          color: 'from-orange-400 to-red-500',
          bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-600',
          unit: '°C'
        };
      case 'humidité':
        return {
          icon: Droplets,
          color: 'from-blue-400 to-cyan-500',
          bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-600',
          unit: '%'
        };
      case 'mouvement':
        return {
          icon: Activity,
          color: 'from-green-400 to-emerald-500',
          bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-600',
          unit: ''
        };
      default:
        return {
          icon: Thermometer,
          color: 'from-gray-400 to-gray-500',
          bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-600',
          unit: ''
        };
    }
  };

  const config = getSensorConfig(type);
  const Icon = config.icon;

  return (
    <div className={`card hover-lift p-6 border ${config.borderColor} ${config.bgColor} animate-fade-in-up`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${config.color} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold capitalize text-gray-800">{type}</h3>
            <div className="flex items-center space-x-1">
              <span className="status-indicator status-online"></span>
              <span className="text-sm text-gray-500">En ligne</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline space-x-1">
          <span className={`text-4xl font-bold ${config.textColor}`}>
            {value}
          </span>
          {config.unit && (
            <span className={`text-lg font-medium ${config.textColor}`}>
              {config.unit}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        <span>{new Date(timestamp).toLocaleString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</span>
      </div>

      {/* Indicateur de tendance (simulé) */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Tendance</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-green-600 font-medium">Stable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;