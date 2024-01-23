import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

//api routes import
import mainRouter from "./src/routes/index.js";

//routes declaration
app.use("/api/v1", mainRouter);

export default app;
