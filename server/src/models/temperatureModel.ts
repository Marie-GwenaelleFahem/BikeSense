import { executeQuery } from "../lib/db";

export interface Temperature {
  id: number;
  value: number;
  timestamp: string;
}

export interface TemperatureStats {
  min: number;
  max: number;
  avg: number;
  count: number;
}

// convertir les timestamps epoch stockés en bigint en ISO 8601
const convertTimestampEpochToISO = (timestampEpoch: bigint): string => {
  return new Date(Number(timestampEpoch)).toISOString();
};

export const fetchAllTemperatures = async (): Promise<Temperature[]> => {
  const result = await executeQuery("SELECT id, value, timestamp FROM temperature ORDER BY timestamp DESC");
  return result.map((temperature: any) => ({
    ...temperature,
    timestamp: convertTimestampEpochToISO(temperature.timestamp)
  }));
};

export const fetchLatestTemperature = async (): Promise<Temperature | null> => {
  const result = await executeQuery("SELECT id, value, timestamp FROM temperature ORDER BY timestamp DESC LIMIT 1");
  return {
    ...result[0],
    timestamp: convertTimestampEpochToISO(result[0].timestamp)
  };
};

export const fetchTemperatureStats = async (): Promise<TemperatureStats> => {
  const result = await executeQuery("SELECT MIN(value) as min, MAX(value) as max, AVG(value) as avg, COUNT(*) as count FROM temperature");
  const stats = result[0];
  
  return {
    min: Number(stats.min),
    max: Number(stats.max),
    avg: Number(stats.avg),
    count: Number(stats.count)
  };
}; 