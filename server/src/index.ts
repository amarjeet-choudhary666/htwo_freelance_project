import dotenv from "dotenv";
// Load environment variables first
dotenv.config();

import { app } from "./app";
import { getPgVersion } from "./db";


const port = process.env.PORT || 4000

getPgVersion()
.then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  })
})
.catch((err: any) => {
  console.error("Failed to start server due to database connection error:", err);
})