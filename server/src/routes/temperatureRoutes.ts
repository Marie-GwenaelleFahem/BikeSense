import { Router } from "express";
import {
  getAllTemperatures,
  getLatestTemperature,
  getAggregateTemperature,
} from "../controllers/temperatureController";

const router = Router();

// Routes pour les températures
router.get("/", getAllTemperatures);
router.get("/latest", getLatestTemperature);
router.get("/aggregate", getAggregateTemperature);

export default router;
