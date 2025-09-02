import { apiClient, apiUtils } from './api';
import type { TemperatureData, HumidityData, MovementData, ApiResponse } from './api';

// Service pour les données de température
export const temperatureService = {
  // Récupérer toutes les données de température
  getAll: (page = 1, limit = 10) => {
    return apiUtils.getWithPagination<TemperatureData>('/temperature', page, limit);
  },

  // Récupérer les données de température avec filtrage
  getFiltered: (params: {
    min?: number;
    max?: number;
    value?: number;
    start?: string;
    end?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params.min !== undefined) queryParams.append('min', params.min.toString());
    if (params.max !== undefined) queryParams.append('max', params.max.toString());
    if (params.value !== undefined) queryParams.append('value', params.value.toString());
    if (params.start) queryParams.append('start', params.start);
    if (params.end) queryParams.append('end', params.end);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    return apiClient.get<ApiResponse<TemperatureData[]>>(`/temperature?${queryParams.toString()}`);
  },

  // Récupérer les données récentes de température
  getRecent: (limit = 10) => {
    return apiUtils.getRecent<TemperatureData>('/temperature', limit);
  },

  // Récupérer les données de température par plage de temps
  getByTimeRange: (startDate: string, endDate: string) => {
    return apiClient.get<ApiResponse<TemperatureData[]>>(`/temperature?start=${startDate}&end=${endDate}`);
  },

  // Récupérer la dernière valeur de température
  getLatest: () => {
    return apiClient.get<ApiResponse<TemperatureData>>('/temperature/latest');
  },

  // Récupérer une donnée de température par ID
  getById: (id: number) => {
    return apiClient.get<ApiResponse<TemperatureData>>(`/temperature/${id}`);
  },

  // Récupérer les statistiques agrégées de température
  getAggregate: (startDate: string, endDate: string) => {
    return apiClient.get<ApiResponse<{
      count: number;
      min: number;
      max: number;
      average: number;
      median: number;
    }>>(`/temperature/aggregate?start=${startDate}&end=${endDate}`);
  },
};

// Service pour les données d'humidité
export const humidityService = {
  // Récupérer toutes les données d'humidité
  getAll: (page = 1, limit = 10) => {
    return apiUtils.getWithPagination<HumidityData>('/humidity', page, limit);
  },

  // Récupérer les données d'humidité avec filtrage
  getFiltered: (params: {
    min?: number;
    max?: number;
    value?: number;
    start?: string;
    end?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params.min !== undefined) queryParams.append('min', params.min.toString());
    if (params.max !== undefined) queryParams.append('max', params.max.toString());
    if (params.value !== undefined) queryParams.append('value', params.value.toString());
    if (params.start) queryParams.append('start', params.start);
    if (params.end) queryParams.append('end', params.end);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    return apiClient.get<ApiResponse<HumidityData[]>>(`/humidity?${queryParams.toString()}`);
  },

  // Récupérer les données récentes d'humidité
  getRecent: (limit = 10) => {
    return apiUtils.getRecent<HumidityData>('/humidity', limit);
  },

  // Récupérer les données d'humidité par plage de temps
  getByTimeRange: (startDate: string, endDate: string) => {
    return apiClient.get<ApiResponse<HumidityData[]>>(`/humidity?start=${startDate}&end=${endDate}`);
  },

  // Récupérer la dernière valeur d'humidité
  getLatest: () => {
    return apiClient.get<ApiResponse<HumidityData>>('/humidity/latest');
  },

  // Récupérer une donnée d'humidité par ID
  getById: (id: number) => {
    return apiClient.get<ApiResponse<HumidityData>>(`/humidity/${id}`);
  },

  // Récupérer les statistiques agrégées d'humidité
  getAggregate: (startDate: string, endDate: string) => {
    return apiClient.get<ApiResponse<{
      count: number;
      min: number;
      max: number;
      average: number;
      median: number;
    }>>(`/humidity/aggregate?start=${startDate}&end=${endDate}`);
  },
};

// Service pour les données de mouvement
export const movementService = {
  // Récupérer toutes les données de mouvement
  getAll: (page = 1, limit = 10) => {
    return apiUtils.getWithPagination<MovementData>('/movement', page, limit);
  },

  // Récupérer les données de mouvement avec filtrage
  getFiltered: (params: {
    state?: boolean;
    start?: string;
    end?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params.state !== undefined) queryParams.append('state', params.state.toString());
    if (params.start) queryParams.append('start', params.start);
    if (params.end) queryParams.append('end', params.end);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    return apiClient.get<ApiResponse<MovementData[]>>(`/movement?${queryParams.toString()}`);
  },

  // Récupérer les données récentes de mouvement
  getRecent: (limit = 10) => {
    return apiUtils.getRecent<MovementData>('/movement', limit);
  },

  // Récupérer les données de mouvement par plage de temps
  getByTimeRange: (startDate: string, endDate: string) => {
    return apiClient.get<ApiResponse<MovementData[]>>(`/movement?start=${startDate}&end=${endDate}`);
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
    return apiClient.get<ApiResponse<MovementData[]>>(`/movement?state=${encodeURIComponent(state)}&page=${page}&limit=${limit}`);
  },

  // Récupérer les statistiques de mouvement
  getStats: () => {
    return apiClient.get<ApiResponse<{
      total_movements: number;
      current_state: string;
      last_movement_time: number;
      average_duration: number;
    }>>('/movement/aggregate');
  },

  // Récupérer les statistiques agrégées de mouvement
  getAggregate: (startDate: string, endDate: string) => {
    return apiClient.get<ApiResponse<{
      count: number;
      total_duration: number;
      average_duration: number;
      states_count: Record<string, number>;
      longest_movement: number;
      shortest_movement: number;
    }>>(`/movement/aggregate?start=${startDate}&end=${endDate}`);
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
  getByTimeRangeAll: (startDate: string, endDate: string) => {
    return Promise.all([
      temperatureService.getByTimeRange(startDate, endDate),
      humidityService.getByTimeRange(startDate, endDate),
      movementService.getByTimeRange(startDate, endDate),
    ]);
  },
}; 