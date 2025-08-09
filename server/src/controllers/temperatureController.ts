import { Request, Response } from "express";
import {
  fetchAllTemperatures,
  fetchLatestTemperature,
  fetchTemperatureStats,
} from "../models/temperatureModel";
import { validateAndCreateFilters } from "../lib/validation";

// Récupérer toutes les températures
export const getAllTemperatures = async (req: Request, res: Response) => {
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

    const temperatures = await fetchAllTemperatures(validation.filters);
    res.json({ success: true, data: temperatures });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching temperatures" });
  }
};

// récupérer la température la plus récente
export const getLatestTemperature = async (req: Request, res: Response) => {
  try {
    const validation = validateAndCreateFilters(req, []);

    if (validation.error) {
      return res
        .status(400)
        .json({ success: false, message: validation.error });
    }

    const temperature = await fetchLatestTemperature();
    if (!temperature) {
      return res
        .status(404)
        .json({ success: false, message: "No temperature data found" });
    }

    res.json({ success: true, data: temperature });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching latest temperature" });
  }
};

// Récupérere es statistiques (ou agregats)
export const getAggregateTemperature = async (req: Request, res: Response) => {
  try {
    const validation = validateAndCreateFilters(req, ["start", "end"]);

    if (validation.error) {
      return res
        .status(400)
        .json({ success: false, message: validation.error });
    }

    const stats = await fetchTemperatureStats(validation.filters);
    res.json({ success: true, data: stats });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching temperature stats" });
  }
};
