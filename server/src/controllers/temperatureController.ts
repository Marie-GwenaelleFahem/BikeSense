import { Request, Response } from "express";
import { executeQuery } from "../lib/db";

// Récupérer toutes les températures
export const getAllTemperatures = async (req: Request, res: Response) => {
  try {
    const temperatures = await executeQuery(
      "SELECT id, value FROM temperature ORDER BY timestamp DESC"
    );

    res.json({
      success: true,
      data: temperatures,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des températures:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des températures",
      error: error instanceof Error ? error.message : "Erreur inconnue",
    });
  }
};
