import { apiClient } from './api';
import type { ApiResponse } from './api';

// Types pour les alertes
export interface Alert {
  id: number;
  type: 'temperature' | 'humidity' | 'movement' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  sensor_id?: number;
  sensor_type?: 'temperature' | 'humidity' | 'movement';
  threshold_value?: number;
  current_value?: number;
  timestamp: number;
  is_resolved: boolean;
  resolved_at?: number;
}

export interface AlertRule {
  id: number;
  name: string;
  sensor_type: 'temperature' | 'humidity' | 'movement';
  condition: 'above' | 'below' | 'equals' | 'not_equals';
  threshold_value: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  is_active: boolean;
  created_at: number;
}

// Service pour les alertes
export const alertService = {
  // Récupérer toutes les alertes
  getAll: (page = 1, limit = 10) => {
    return apiClient.get<ApiResponse<Alert[]>>(`/alerts?page=${page}&limit=${limit}`);
  },

  // Récupérer les alertes non résolues
  getActive: (page = 1, limit = 10) => {
    return apiClient.get<ApiResponse<Alert[]>>(`/alerts/active?page=${page}&limit=${limit}`);
  },

  // Récupérer les alertes par type
  getByType: (type: Alert['type'], page = 1, limit = 10) => {
    return apiClient.get<ApiResponse<Alert[]>>(`/alerts/type/${type}?page=${page}&limit=${limit}`);
  },

  // Récupérer les alertes par sévérité
  getBySeverity: (severity: Alert['severity'], page = 1, limit = 10) => {
    return apiClient.get<ApiResponse<Alert[]>>(`/alerts/severity/${severity}?page=${page}&limit=${limit}`);
  },

  // Récupérer une alerte par ID
  getById: (id: number) => {
    return apiClient.get<ApiResponse<Alert>>(`/alerts/${id}`);
  },

  // Marquer une alerte comme résolue
  resolve: (id: number) => {
    return apiClient.patch<ApiResponse<Alert>>(`/alerts/${id}/resolve`);
  },

  // Récupérer les règles d'alerte
  getRules: () => {
    return apiClient.get<ApiResponse<AlertRule[]>>('/alerts/rules');
  },

  // Créer une nouvelle règle d'alerte
  createRule: (rule: Omit<AlertRule, 'id' | 'created_at'>) => {
    return apiClient.post<ApiResponse<AlertRule>>('/alerts/rules', rule);
  },

  // Mettre à jour une règle d'alerte
  updateRule: (id: number, rule: Partial<AlertRule>) => {
    return apiClient.put<ApiResponse<AlertRule>>(`/alerts/rules/${id}`, rule);
  },

  // Supprimer une règle d'alerte
  deleteRule: (id: number) => {
    return apiClient.delete<ApiResponse<void>>(`/alerts/rules/${id}`);
  },

  // Activer/désactiver une règle d'alerte
  toggleRule: (id: number, isActive: boolean) => {
    return apiClient.patch<ApiResponse<AlertRule>>(`/alerts/rules/${id}/toggle`, { is_active: isActive });
  },

  // Récupérer les statistiques des alertes
  getStats: () => {
    return apiClient.get<ApiResponse<{
      total_alerts: number;
      active_alerts: number;
      resolved_alerts: number;
      alerts_by_type: Record<string, number>;
      alerts_by_severity: Record<string, number>;
    }>>('/alerts/stats');
  },
}; 