import { Request, Response } from "express";
import {
  fetchAllHumidity,
  fetchLatestHumidity,
  fetchHumidityStats,
} from "../models/humidityModel";

// Récupérer toutes les températures
export const getAllHumidity = async (req: Request, res: Response) => {
  try {
    // ajouter une liste exhaustive des parametres autorisés
    const allowedParams = ["min", "max", "value", "start", "end"];
    const hasUnknownParams = Object.keys(req.query).some(
      (param) => !allowedParams.includes(param)
    );
    if (hasUnknownParams) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid parameters" });
    }

    const filters = {
      min: req.query.min ? Number(req.query.min) : undefined,
      max: req.query.max ? Number(req.query.max) : undefined,
      value: req.query.value ? Number(req.query.value) : undefined,
      start: req.query.start as string,
      end: req.query.end as string,
    };

    // vérification de la cohérence des filtres
    if (
      filters.min !== undefined &&
      filters.max !== undefined &&
      filters.min > filters.max
    ) {
      return res.status(400).json({
        success: false,
        message: "Min value cannot be greater than max value",
      });
    }
    if (
      filters.start &&
      filters.end &&
      new Date(filters.start) > new Date(filters.end)
    ) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be after end date",
      });
    }

    const humidity = await fetchAllHumidity(filters);
    res.json({ success: true, data: humidity });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching humidity" });
  }
};

// récupérer la température la plus récente
export const getLatestHumidity = async (req: Request, res: Response) => {
  try {
    // Aucun paramètre autorisé
    if (Object.keys(req.query).length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid parameters" });
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

// Récupérere es statistiques (ou agregats)
export const getAggregateHumidity = async (req: Request, res: Response) => {
  try {
    // Validation simple des paramètres
    const allowedParams = ["start", "end"];
    const hasUnknownParams = Object.keys(req.query).some(
      (param) => !allowedParams.includes(param)
    );
    if (hasUnknownParams) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid parameters" });
    }

    const filters = {
      start: req.query.start as string,
      end: req.query.end as string,
    };

    // vérification de la cohérence des filtres
    if (
      filters.start &&
      filters.end &&
      new Date(filters.start) > new Date(filters.end)
    ) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be after end date",
      });
    }

    const stats = await fetchHumidityStats(filters);
    res.json({ success: true, data: stats });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching humidity stats" });
  }
};
