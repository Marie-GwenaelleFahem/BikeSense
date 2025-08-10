import { executeQuery } from "../lib/db";
import { convertTimestampEpochToISO } from "../lib/utils";

export interface Humidity {
  id: number;
  value: number;
  date: string;
}

export interface HumidityStats {
  min: number;
  max: number;
  avg: number;
  count: number;
}

export const fetchAllHumidities = async (
  filters?: any
): Promise<Humidity[]> => {
  let query = "SELECT id, value, timestamp FROM humidity WHERE 1=1";
  const params: any[] = [];

  if (filters?.min !== undefined) {
    query += " AND value >= ?";
    params.push(Number(filters.min));
  }
  if (filters?.max !== undefined) {
    query += " AND value <= ?";
    params.push(Number(filters.max));
  }
  if (filters?.value !== undefined) {
    query += " AND value = ?";
    params.push(Number(filters.value));
  }
  if (filters?.start) {
    const date = new Date(filters.start);
    // si pas d'ehure renseignée on met 00:00:00
    if (filters.start.length === 10) {
      date.setHours(0, 0, 0, 0);
    }
    query += " AND timestamp >= ?";
    params.push(date.getTime());
  }
  if (filters?.end) {
    const date = new Date(filters.end);
    // si pas d'heure renseignée on met 23:59:59
    if (filters.end.length === 10) {
      date.setHours(23, 59, 59, 999);
    }
    query += " AND timestamp <= ?";
    params.push(date.getTime());
  }

  query += " ORDER BY timestamp DESC";
  const result = await executeQuery(query, params);

  return result.map((temperature: any) => ({
    id: temperature.id,
    value: temperature.value,
    date: convertTimestampEpochToISO(temperature.timestamp),
  }));
};
export const fetchLatestHumidity = async (): Promise<Humidity | null> => {
  const result = await executeQuery(
    "SELECT id, value, timestamp FROM humidity ORDER BY timestamp DESC LIMIT 1"
  );
  if (result.length === 0) return null;

  return {
    id: result[0].id,
    value: result[0].value,
    date: convertTimestampEpochToISO(result[0].timestamp),
  };
};

export const fetchHumidityStats = async (
  filters?: any
): Promise<HumidityStats> => {
  let query =
    "SELECT MIN(value) as min, MAX(value) as max, AVG(value) as avg, COUNT(*) as count FROM humidity WHERE 1=1";
  const params: any[] = [];

  if (filters?.start) {
    const date = new Date(filters.start);
    // si pas d'ehure renseignée on met 00:00:00
    if (filters.start.length === 10) {
      date.setHours(0, 0, 0, 0);
    }
    query += " AND timestamp >= ?";
    params.push(date.getTime());
  }
  if (filters?.end) {
    const date = new Date(filters.end);
    // si pas d'heure renseignée on met 23:59:59
    if (filters.end.length === 10) {
      date.setHours(23, 59, 59, 999);
    }
    query += " AND timestamp <= ?";
    params.push(date.getTime());
  }

  const result = await executeQuery(query, params);
  const stats = result[0];
  return {
    min: Number(stats.min),
    max: Number(stats.max),
    avg: Number(stats.avg),
    count: Number(stats.count),
  };
};
