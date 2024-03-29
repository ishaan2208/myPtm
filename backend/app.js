import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//api routes import
import mainRouter from "./src/routes/index.js";

//routes declaration
app.use("/api/v1", mainRouter);
app.get("/api", (req, res) => res.json({ message: "Hello from api" }));

export default app;
