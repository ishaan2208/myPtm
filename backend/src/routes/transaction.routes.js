import express from "express";
import { createTransaction } from "../controller/transaction.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

//controllers

router.route("/").post(verifyJWT, createTransaction);

export default router;
