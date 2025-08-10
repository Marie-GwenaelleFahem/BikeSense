import { Router } from "express";
import {
  getAggregateHumidity,
  getAllHumidities,
  getLatestHumidity,
} from "../controllers/humidityController";

const router = Router();

// Routes for humidities
router.get("/", getAllHumidities);
router.get("/latest", getLatestHumidity);
router.get("/aggregate", getAggregateHumidity);

export default router;
