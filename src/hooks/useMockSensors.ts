export interface Sensor {
    id: number;
    type: 'temperature' | 'humidity' | 'movement';
    value: string;
    timestamp: string;
  }
  
  const useMockSensors = (): Sensor[] => {
    return [
      { id: 1, type: 'temperature', value: '32°C', timestamp: '2025-08-06T09:00:00Z' },
      { id: 2, type: 'humidity', value: '75%', timestamp: '2025-08-06T08:00:00Z' },
      { id: 3, type: 'movement', value: '15km/h', timestamp: '2025-08-06T09:00:00Z' },
      { id: 4, type: 'temperature', value: '32°C', timestamp: '2025-08-06T09:00:00Z' },
      { id: 5, type: 'humidity', value: '75%', timestamp: '2025-08-06T09:00:00Z' },
      { id: 6, type: 'movement', value: '15km/h', timestamp: '2025-08-06T09:00:00Z' },
      { id: 7, type: 'temperature', value: '32°C', timestamp: '2025-08-06T09:00:00Z' },
      { id: 8, type: 'humidity', value: '75%', timestamp: '2025-08-06T09:00:00Z' },
      { id: 9, type: 'movement', value: '15km/h', timestamp: '2025-08-06T09:00:00Z' },
      { id: 10, type: 'temperature', value: '32°C', timestamp: '2025-08-06T09:00:00Z' },
      { id: 11, type: 'humidity', value: '75%', timestamp: '2025-08-06T09:00:00Z' },
      { id: 12, type: 'movement', value: '15km/h', timestamp: '2025-08-06T09:00:00Z' },
      { id: 13, type: 'temperature', value: '32°C', timestamp: '2025-08-06T09:00:00Z' },
      { id: 14, type: 'humidity', value: '75%', timestamp: '2025-08-06T09:00:00Z' },
      { id: 15, type: 'movement', value: '15km/h', timestamp: '2025-08-06T09:00:00Z' },
      { id: 16, type: 'temperature', value: '32°C', timestamp: '2025-07-06T09:00:00Z' },
      { id: 17, type: 'humidity', value: '75%', timestamp: '2025-07-06T09:00:00Z' },
    ];
  };
  
  export default useMockSensors;