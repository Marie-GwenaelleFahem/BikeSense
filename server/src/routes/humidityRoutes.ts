import { Router } from "express";
import {
  getAggregateHumidity,
  getAllHumidity,
  getLatestHumidity,
} from "../controllers/humidityController";

const router = Router();

// Routes pour les humidités
router.get("/", getAllHumidity);
router.get("/latest", getLatestHumidity);
router.get("/aggregate", getAggregateHumidity);

export default router;
