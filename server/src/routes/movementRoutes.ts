import { Router } from "express";
import {
  getAllMovements,
  getLatestMovement,
  getAggregateMovement,
} from "../controllers/movementController";

const router = Router();

// Routes for movements
router.get("/", getAllMovements);
router.get("/latest", getLatestMovement);
router.get("/aggregate", getAggregateMovement);

export default router;
