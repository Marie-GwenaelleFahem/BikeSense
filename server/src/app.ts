import express, { Request, Response } from "express";
import temperatureRoutes from "./routes/temperatureRoutes";
import humidityRoutes from "./routes/humidityRoutes";
const app = express();

app.use(express.json());

app.use("/api/temperature", temperatureRoutes);
app.use("/api/humidity", humidityRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running");
});

export default app;
