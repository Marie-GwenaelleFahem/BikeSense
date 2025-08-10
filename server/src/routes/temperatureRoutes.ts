import { Router } from "express";
import {
  getAllTemperatures,
  getLatestTemperature,
  getAggregateTemperature,
} from "../controllers/temperatureController";

const router = Router();

// Routes for temperatures
router.get("/", getAllTemperatures);
router.get("/latest", getLatestTemperature);
router.get("/aggregate", getAggregateTemperature);

export default router;
