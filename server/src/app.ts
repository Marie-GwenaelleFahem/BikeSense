import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import temperatureRoutes from "./routes/temperatureRoutes";
import humidityRoutes from "./routes/humidityRoutes";
import movementRoutes from "./routes/movementRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS for frontend dev server
const FRONT_ORIGIN = process.env.FRONT_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: FRONT_ORIGIN,
    credentials: true,
  })
);

const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);
app.use("/api/temperature", temperatureRoutes);
app.use("/api/humidity", humidityRoutes);
app.use("/api/movement", movementRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running");
});

export default app;
