import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';

// Configuration de base pour axios
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Instance axios configurée
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // Pour les cookies de session
});

// Intercepteur pour gérer les erreurs globalement
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Types de base pour les réponses API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Types pour les données des capteurs
export interface TemperatureData {
  id: number;
  value: number;
  timestamp: number;
}

export interface HumidityData {
  id: number;
  value: number;
  timestamp: number;
}

export interface MovementData {
  id: number;
  state: 'start-moving' | 'stationary' | 'stop-moving';
  move_duration: number;
  move_number: number;
  x_axis: number;
  y_axis: number;
  z_axis: number;
  timestamp: number;
}

export interface User {
  id: number;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

// Fonction de compatibilité avec l'ancienne apiFetch
export async function apiFetch(path: string, init: { method: string; json?: any } = { method: 'GET' }) {
  const { method, json } = init;
  
  try {
    const response = await apiClient.request({
      method: method.toLowerCase(),
      url: path,
      data: json,
    });
    
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const text = error.response.data || '';
      const errorObj = new Error(text || `HTTP ${error.response.status}`);
      (errorObj as any).status = error.response.status;
      throw errorObj;
    }
    throw error;
  }
}

// Utilitaires pour les requêtes
export const apiUtils = {
  // Récupérer les données avec pagination
  getWithPagination: <T>(endpoint: string, page = 1, limit = 10) => {
    return apiClient.get<ApiResponse<T[]>>(`${endpoint}?page=${page}&limit=${limit}`);
  },

  // Récupérer les données récentes (dernières N entrées)
  getRecent: <T>(endpoint: string, limit = 10) => {
    return apiClient.get<ApiResponse<T[]>>(`${endpoint}/recent?limit=${limit}`);
  },

  // Récupérer les données par plage de temps
  getByTimeRange: <T>(endpoint: string, startTime: number, endTime: number) => {
    return apiClient.get<ApiResponse<T[]>>(`${endpoint}/range?start=${startTime}&end=${endTime}`);
  },
}; 