import { Request, Response } from "express";
import {
  fetchAllMovements,
  fetchLatestMovement,
  fetchMovementStats,
} from "../models/movementModel";
import { validateAndCreateFilters } from "../lib/validation";

// Get all movements
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

// get the latest movement
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

// Get the movement stats for a given period
export const getAggregateMovement = async (req: Request, res: Response) => {
  try {
    const validation = validateAndCreateFilters(
      req,
      ["start", "end"],
      ["start", "end"]
    );

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
