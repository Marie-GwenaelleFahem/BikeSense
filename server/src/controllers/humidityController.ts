import { Request, Response } from "express";

import { validateAndCreateFilters } from "../lib/validation";
import {
  fetchAllHumidities,
  fetchHumidityStats,
  fetchLatestHumidity,
} from "../models/humidityModel";

// Get all humidities
export const getAllHumidities = async (req: Request, res: Response) => {
  try {
    const validation = validateAndCreateFilters(req, [
      "min",
      "max",
      "value",
      "start",
      "end",
    ]);

    if (validation.error) {
      return res
        .status(400)
        .json({ success: false, message: validation.error });
    }

    const humidities = await fetchAllHumidities(validation.filters);
    res.json({ success: true, data: humidities });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching humidities" });
  }
};

// get the latest humidity
export const getLatestHumidity = async (req: Request, res: Response) => {
  try {
    const validation = validateAndCreateFilters(req, []);

    if (validation.error) {
      return res
        .status(400)
        .json({ success: false, message: validation.error });
    }

    const humidity = await fetchLatestHumidity();
    if (!humidity) {
      return res
        .status(404)
        .json({ success: false, message: "No humidity data found" });
    }

    res.json({ success: true, data: humidity });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching latest humidity" });
  }
};

// Get the humidity stats for a given period
export const getAggregateHumidity = async (req: Request, res: Response) => {
  try {
    const validation = validateAndCreateFilters(req, ["start", "end"]);

    if (validation.error) {
      return res
        .status(400)
        .json({ success: false, message: validation.error });
    }

    const stats = await fetchHumidityStats(validation.filters);
    res.json({ success: true, data: stats });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching humidity stats" });
  }
};
