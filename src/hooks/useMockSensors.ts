export interface Sensor {
    type: 'température' | 'humidité' | 'mouvement';
    value: string;
  }
  
  const useMockSensors = (): Sensor[] => {
    return [
      { type: 'température', value: '32°C' },
      { type: 'humidité', value: '75%' },
      { type: 'mouvement', value: '15km/h' },
    ];
  };
  
  export default useMockSensors;