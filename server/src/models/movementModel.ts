import { executeQuery } from "../lib/db";
import { convertTimestampEpochToISO } from "../lib/utils";

export interface Movement {
  id: number;
  state: "start-moving" | "stop-moving" | "stationnary";
  move_duration: number | null;
  move_number: number | null;
  x_axis: number | null;
  y_axis: number | null;
  z_axis: number | null;
  date: string; // ISO string format
}

export interface MovementStats {
  total_movements: number;
  start_movements: number;
  stop_movements: number;
  stationnary_count: number;
  avg_move_duration: number | null;
  total_duration: number;
}

export const fetchAllMovements = async (filters?: any): Promise<Movement[]> => {
  let query =
    "SELECT id, state, move_duration, move_number, x_axis, y_axis, z_axis, timestamp FROM movement WHERE 1=1";
  const params: any[] = [];

  if (filters?.state) {
    query += " AND state = ?";
    params.push(filters.state);
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

  return result.map((movement: any) => ({
    id: movement.id,
    state: movement.state,
    move_duration: movement.move_duration,
    move_number: movement.move_number,
    x_axis: movement.x_axis,
    y_axis: movement.y_axis,
    z_axis: movement.z_axis,
    date: convertTimestampEpochToISO(movement.timestamp),
  }));
};

export const fetchLatestMovement = async (): Promise<Movement | null> => {
  const result = await executeQuery(
    "SELECT id, state, move_duration, move_number, x_axis, y_axis, z_axis, timestamp FROM movement ORDER BY timestamp DESC LIMIT 1"
  );
  if (result.length === 0) return null;

  return {
    id: result[0].id,
    state: result[0].state,
    move_duration: result[0].move_duration,
    move_number: result[0].move_number,
    x_axis: result[0].x_axis,
    y_axis: result[0].y_axis,
    z_axis: result[0].z_axis,
    date: convertTimestampEpochToISO(result[0].timestamp),
  };
};

export const fetchMovementStats = async (
  filters?: any
): Promise<MovementStats> => {
  let query = `
    SELECT 
      COUNT(*) as total_movements,
      SUM(CASE WHEN state = 'start-moving' THEN 1 ELSE 0 END) as start_movements,
      SUM(CASE WHEN state = 'stop-moving' THEN 1 ELSE 0 END) as stop_movements,
      SUM(CASE WHEN state = 'stationnary' THEN 1 ELSE 0 END) as stationnary_count,
      AVG(CASE WHEN move_duration IS NOT NULL THEN move_duration END) as avg_move_duration,
      SUM(CASE WHEN move_duration IS NOT NULL THEN move_duration ELSE 0 END) as total_duration
    FROM movement WHERE 1=1`;
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
    total_movements: Number(stats.total_movements),
    start_movements: Number(stats.start_movements),
    stop_movements: Number(stats.stop_movements),
    stationnary_count: Number(stats.stationnary_count),
    avg_move_duration: stats.avg_move_duration
      ? Number(stats.avg_move_duration)
      : null,
    total_duration: Number(stats.total_duration),
  };
};
