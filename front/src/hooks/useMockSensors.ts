export interface Sensor {
    id: number;
    type: 'température' | 'humidité' | 'mouvement';
    value: string;
    timestamp: string;
  }
  
  const useMockSensors = (): Sensor[] => {
    return [
      { id: 1, type: 'température', value: '10°C', timestamp: '2025-07-15T09:00:00Z' },
      { id: 2, type: 'humidité', value: '15%', timestamp: '2025-07-15T08:00:00Z' },
      { id: 3, type: 'mouvement', value: '12km/h', timestamp: '2025-07-15T09:00:00Z' },
      { id: 4, type: 'température', value: '31°C', timestamp: '2025-07-20T10:00:00Z' },
      { id: 5, type: 'humidité', value: '42%', timestamp: '2025-07-25T11:00:00Z' },
      { id: 6, type: 'mouvement', value: '18km/h', timestamp: '2025-07-30T12:00:00Z' },
      { id: 7, type: 'température', value: '40°C', timestamp: '2025-08-01T13:00:00Z' },
      { id: 8, type: 'humidité', value: '40%', timestamp: '2025-08-05T14:00:00Z' },
      { id: 9, type: 'mouvement', value: '8km/h', timestamp: '2025-08-10T15:00:00Z' },
      { id: 10, type: 'température', value: '50°C', timestamp: '2025-08-15T16:00:00Z' },
      { id: 11, type: 'humidité', value: '20%', timestamp: '2025-08-20T17:00:00Z' },
      { id: 12, type: 'mouvement', value: '22km/h', timestamp: '2025-08-25T18:00:00Z' },
      { id: 13, type: 'température', value: '26°C', timestamp: '2025-08-28T19:00:00Z' },
      { id: 14, type: 'humidité', value: '75%', timestamp: '2025-08-31T20:00:00Z' },
    ];
  };
  export default useMockSensors;