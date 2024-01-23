import express from "express";

//api routes import
import userRoutes from "./user.routes.js";
import transactionRoutes from "./transaction.routes.js";

//created router
const router = express.Router();

//routes
router.use("/users", userRoutes);
router.use("/transactions", transactionRoutes);

export default router;
