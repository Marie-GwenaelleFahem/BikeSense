export type SensorType = 'température' | 'humidité' | 'mouvement';

export interface Sensor {
  id: number;
  type: SensorType;
  value: string;
  timestamp: string;
}
