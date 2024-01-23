import app from "./app.js";
import { connectToDatabase } from "./src/database/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 5010;

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
  });
});
