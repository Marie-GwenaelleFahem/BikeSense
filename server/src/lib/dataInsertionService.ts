import { executeQuery } from "./db";

export interface MQTTData {
  sink_id: string;
  source_address: number;
  sensor_id: number;
  tx_time_ms_epoch: number;
  data: any;
  event_id: number;
  _topic: string;
  _ts_src: string;
  _retained: boolean;
}

export class DataInsertionService {
  // insère les données selon le source_address (id du capteur)
  static async insertData(data: MQTTData): Promise<void> {
    try {
      const sourceAddress = data.source_address;
      switch (sourceAddress) {
        case 1293593036:
          await this.insertTemperature(data);
          break;
        case 803358716:
          await this.insertMovement(data);
          break;
        case 2048751136:
          await this.insertHumidity(data);
          break;
        default:
          console.log(`Unknown sensor: ${sourceAddress}`);
      }
    } catch (error) {
      console.error(`Error while inserting data:`, error);
    }
  }

  private static async insertTemperature(data: MQTTData): Promise<void> {
    const query = `INSERT INTO temperature (value, timestamp) VALUES (?, ?)`;
    await executeQuery(query, [data.data.temperature, data.tx_time_ms_epoch]);
  }

  private static async insertMovement(data: MQTTData): Promise<void> {
    const query = `INSERT INTO movement (state, move_duration, move_number, x_axis, y_axis, z_axis, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await executeQuery(query, [
      data.data.state,
      data.data.move_duration || 0,
      data.data.move_number || 0,
      data.data.x_axis || 0,
      data.data.y_axis || 0,
      data.data.z_axis || 0,
      data.tx_time_ms_epoch,
    ]);
  }

  private static async insertHumidity(data: MQTTData): Promise<void> {
    const query = `INSERT INTO humidity (value, timestamp) VALUES (?, ?)`;
    await executeQuery(query, [data.data.humidity, data.tx_time_ms_epoch]);
  }
}
