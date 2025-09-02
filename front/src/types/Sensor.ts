export type SensorType = 'température' | 'humidité' | 'mouvement';

export interface Sensor {
  type: SensorType;
  value: string;
}
