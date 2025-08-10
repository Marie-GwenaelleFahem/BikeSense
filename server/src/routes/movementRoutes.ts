import { Router } from "express";
import {
  getAllMovements,
  getLatestMovement,
  getAggregateMovement,
} from "../controllers/movementController";

const router = Router();

// Routes pour les mouvements
router.get("/", getAllMovements);
router.get("/latest", getLatestMovement);
router.get("/aggregate", getAggregateMovement);

export default router;
