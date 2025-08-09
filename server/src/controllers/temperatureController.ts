import { Request, Response } from "express";
import {
  fetchAllTemperatures,
  fetchLatestTemperature,
  fetchTemperatureStats,
} from "../models/temperatureModel";

// Récupérer toutes les températures
export const getAllTemperatures = async (req: Request, res: Response) => {
  try {
    const filters = {
      min: req.query.min ? Number(req.query.min) : undefined,
      max: req.query.max ? Number(req.query.max) : undefined,
      value: req.query.value ? Number(req.query.value) : undefined,
      start: req.query.start as string,
      end: req.query.end as string,
    };

    const temperatures = await fetchAllTemperatures(filters);
    res.json({ success: true, data: temperatures });
  } catch (error) {
    console.error("Error in getAllTemperatures:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching temperatures" });
  }
};

// récupérer la température la plus récente
export const getLatestTemperature = async (req: Request, res: Response) => {
  try {
    const temperature = await fetchLatestTemperature();
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
    const filters = {
      start: req.query.start as string,
      end: req.query.end as string,
    };
    const stats = await fetchTemperatureStats(filters);
    res.json({ success: true, data: stats });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching temperature stats" });
  }
};
