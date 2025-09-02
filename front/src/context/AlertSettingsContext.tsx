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
  const [tempLimit, setTempLimit] = useState<number>(30);
  const [humidityLimit, setHumidityLimit] = useState<number>(70);
  const [movementThreshold, setMovementThreshold] = useState<number>(5);

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