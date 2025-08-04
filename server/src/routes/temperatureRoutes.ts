import { Router } from "express";
import { getAllTemperatures } from "../controllers/temperatureController";

const router = Router();

// Route pour les températures
router.get("/", getAllTemperatures);

export default router;
