import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { testConnection } from "./lib/db";

const port = 3000;

app.listen(port, async () => {
  console.log(`Server listening at http://localhost:${port}`);

  await testConnection();
});
