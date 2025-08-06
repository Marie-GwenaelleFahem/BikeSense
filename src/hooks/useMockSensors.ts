export interface Sensor {
    type: 'température' | 'humidité' | 'mouvement';
    value: string;
  }
  
  const useMockSensors = (): Sensor[] => {
    return [
      { type: 'température', value: '22°C' },
      { type: 'humidité', value: '45%' },
      { type: 'mouvement', value: 'Aucun mouvement' },
    ];
  };
  
  export default useMockSensors;