import { Request, Response } from "express";
import { 
  fetchAllTemperatures,
  fetchLatestTemperature,
  fetchTemperatureStats
} from "../models/temperatureModel";

// Récupérer toutes les températures
export const getAllTemperatures = async (req: Request, res: Response) => {
  try {
    const temperatures = await fetchAllTemperatures();
    res.json({ success: true, data: temperatures });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching temperatures" });
  }
};

// récupérer la température la plus récente
export const getLatestTemperature = async (req: Request, res: Response) => {
  try {
    const temperature = await fetchLatestTemperature();
    res.json({ success: true, data: temperature });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching latest temperature" });
  }
};

// Récupérere es statistiques (ou agregats)
export const getAggregateTemperature = async (req: Request, res: Response) => {
  try {
    const stats = await fetchTemperatureStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching temperature stats" });
  }
};
