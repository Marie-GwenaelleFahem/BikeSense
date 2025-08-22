import { apiClient, apiUtils } from './api';
import type { TemperatureData, HumidityData, MovementData, ApiResponse } from './api';

// Service pour les données de température
export const temperatureService = {
  // Récupérer toutes les données de température
  getAll: (page = 1, limit = 10) => {
    return apiUtils.getWithPagination<TemperatureData>('/temperature', page, limit);
  },

  // Récupérer les données récentes de température
  getRecent: (limit = 10) => {
    return apiUtils.getRecent<TemperatureData>('/temperature', limit);
  },

  // Récupérer les données de température par plage de temps
  getByTimeRange: (startTime: number, endTime: number) => {
    return apiUtils.getByTimeRange<TemperatureData>('/temperature', startTime, endTime);
  },

  // Récupérer la dernière valeur de température
  getLatest: () => {
    return apiClient.get<ApiResponse<TemperatureData>>('/temperature/latest');
  },

  // Récupérer une donnée de température par ID
  getById: (id: number) => {
    return apiClient.get<ApiResponse<TemperatureData>>(`/temperature/${id}`);
  },
};

// Service pour les données d'humidité
export const humidityService = {
  // Récupérer toutes les données d'humidité
  getAll: (page = 1, limit = 10) => {
    return apiUtils.getWithPagination<HumidityData>('/humidity', page, limit);
  },

  // Récupérer les données récentes d'humidité
  getRecent: (limit = 10) => {
    return apiUtils.getRecent<HumidityData>('/humidity', limit);
  },

  // Récupérer les données d'humidité par plage de temps
  getByTimeRange: (startTime: number, endTime: number) => {
    return apiUtils.getByTimeRange<HumidityData>('/humidity', startTime, endTime);
  },

  // Récupérer la dernière valeur d'humidité
  getLatest: () => {
    return apiClient.get<ApiResponse<HumidityData>>('/humidity/latest');
  },

  // Récupérer une donnée d'humidité par ID
  getById: (id: number) => {
    return apiClient.get<ApiResponse<HumidityData>>(`/humidity/${id}`);
  },
};

// Service pour les données de mouvement
export const movementService = {
  // Récupérer toutes les données de mouvement
  getAll: (page = 1, limit = 10) => {
    return apiUtils.getWithPagination<MovementData>('/movement', page, limit);
  },

  // Récupérer les données récentes de mouvement
  getRecent: (limit = 10) => {
    return apiUtils.getRecent<MovementData>('/movement', limit);
  },

  // Récupérer les données de mouvement par plage de temps
  getByTimeRange: (startTime: number, endTime: number) => {
    return apiUtils.getByTimeRange<MovementData>('/movement', startTime, endTime);
  },

  // Récupérer le dernier mouvement
  getLatest: () => {
    return apiClient.get<ApiResponse<MovementData>>('/movement/latest');
  },

  // Récupérer une donnée de mouvement par ID
  getById: (id: number) => {
    return apiClient.get<ApiResponse<MovementData>>(`/movement/${id}`);
  },

  // Récupérer les mouvements par état
  getByState: (state: 'start-moving' | 'stationary' | 'stop-moving', page = 1, limit = 10) => {
    return apiClient.get<ApiResponse<MovementData[]>>(`/movement/state/${state}?page=${page}&limit=${limit}`);
  },

  // Récupérer les statistiques de mouvement
  getStats: () => {
    return apiClient.get<ApiResponse<{
      total_movements: number;
      current_state: string;
      last_movement_time: number;
      average_duration: number;
    }>>('/movement/stats');
  },
};

// Service combiné pour tous les capteurs
export const sensorService = {
  // Récupérer les dernières données de tous les capteurs
  getLatestAll: () => {
    return Promise.all([
      temperatureService.getLatest(),
      humidityService.getLatest(),
      movementService.getLatest(),
    ]);
  },

  // Récupérer les données récentes de tous les capteurs
  getRecentAll: (limit = 10) => {
    return Promise.all([
      temperatureService.getRecent(limit),
      humidityService.getRecent(limit),
      movementService.getRecent(limit),
    ]);
  },

  // Récupérer les données par plage de temps pour tous les capteurs
  getByTimeRangeAll: (startTime: number, endTime: number) => {
    return Promise.all([
      temperatureService.getByTimeRange(startTime, endTime),
      humidityService.getByTimeRange(startTime, endTime),
      movementService.getByTimeRange(startTime, endTime),
    ]);
  },
}; 