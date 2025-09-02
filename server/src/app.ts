import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import temperatureRoutes from "./routes/temperatureRoutes";
import humidityRoutes from "./routes/humidityRoutes";
import movementRoutes from "./routes/movementRoutes";

const app = express();

app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/temperature", temperatureRoutes);
app.use("/api/humidity", humidityRoutes);
app.use("/api/movement", movementRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running");
});

export default app;
