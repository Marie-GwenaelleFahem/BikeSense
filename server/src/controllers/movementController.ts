import { Request, Response } from "express";
import {
  fetchAllMovements,
  fetchLatestMovement,
  fetchMovementStats,
} from "../models/movementModel";
import { validateAndCreateFilters } from "../lib/validation";

// Récupérer tous les mouvements
export const getAllMovements = async (req: Request, res: Response) => {
  try {
    const validation = validateAndCreateFilters(req, ["state", "start", "end"]);

    if (validation.error) {
      return res
        .status(400)
        .json({ success: false, message: validation.error });
    }

    const movements = await fetchAllMovements(validation.filters);
    res.json({ success: true, data: movements });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching movements" });
  }
};

// récupérer le mouvement le plus récent
export const getLatestMovement = async (req: Request, res: Response) => {
  try {
    const validation = validateAndCreateFilters(req, []);

    if (validation.error) {
      return res
        .status(400)
        .json({ success: false, message: validation.error });
    }

    const movement = await fetchLatestMovement();
    if (!movement) {
      return res
        .status(404)
        .json({ success: false, message: "No movement data found" });
    }

    res.json({ success: true, data: movement });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching latest movement" });
  }
};

// Récupérer les statistiques (ou agrégats)
export const getAggregateMovement = async (req: Request, res: Response) => {
  try {
    const validation = validateAndCreateFilters(req, ["start", "end"]);

    if (validation.error) {
      return res
        .status(400)
        .json({ success: false, message: validation.error });
    }

    const stats = await fetchMovementStats(validation.filters);
    res.json({ success: true, data: stats });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching movement stats" });
  }
};
