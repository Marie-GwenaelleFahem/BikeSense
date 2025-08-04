import express, { Request, Response } from "express";
import temperatureRoutes from "./routes/temperatureRoutes";

const app = express();

app.use(express.json());

app.use("/api/temperature", temperatureRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running");
});

export default app;
