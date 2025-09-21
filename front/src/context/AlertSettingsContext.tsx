import { createContext, useContext, useState, type ReactNode } from 'react';

interface AlertSettings {
  tempLimit: number;
  humidityLimit: number;
  movementThreshold: number;
  setTempLimit: (value: number) => void;
  setHumidityLimit: (value: number) => void;
  setMovementThreshold: (value: number) => void;
}

const AlertSettingsContext = createContext<AlertSettings | undefined>(undefined);

export const AlertSettingsProvider = ({ children }: { children: ReactNode }) => {
  // Charger les valeurs depuis localStorage ou utiliser les valeurs par défaut
  const [tempLimit, setTempLimitState] = useState<number>(() => {
    const saved = localStorage.getItem('bikesense_tempLimit');
    return saved ? parseInt(saved) : 30;
  });
  
  const [humidityLimit, setHumidityLimitState] = useState<number>(() => {
    const saved = localStorage.getItem('bikesense_humidityLimit');
    return saved ? parseInt(saved) : 70;
  });
  
  const [movementThreshold, setMovementThresholdState] = useState<number>(() => {
    const saved = localStorage.getItem('bikesense_movementThreshold');
    return saved ? parseInt(saved) : 5;
  });

  // Wrappers qui sauvegardent automatiquement dans localStorage
  const setTempLimit = (value: number) => {
    setTempLimitState(value);
    localStorage.setItem('bikesense_tempLimit', value.toString());
  };

  const setHumidityLimit = (value: number) => {
    setHumidityLimitState(value);
    localStorage.setItem('bikesense_humidityLimit', value.toString());
  };

  const setMovementThreshold = (value: number) => {
    setMovementThresholdState(value);
    localStorage.setItem('bikesense_movementThreshold', value.toString());
  };

  return (
    <AlertSettingsContext.Provider
      value={{ tempLimit, humidityLimit, movementThreshold, setTempLimit, setHumidityLimit, setMovementThreshold }}
    >
      {children}
    </AlertSettingsContext.Provider>
  );
};

export const useAlertSettings = () => {
  const context = useContext(AlertSettingsContext);
  if (!context) {
    throw new Error('useAlertSettings must be used within an AlertSettingsProvider');
  }
  return context;
};