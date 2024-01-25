import express from "express";
import {
  deleteAllUsers,
  editUser,
  getAllUsers,
  getUser,
  getUserTransactions,
  login,
  signUp,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

//controllers
router.route("/getUsers").get(verifyJWT, getAllUsers);
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/edit").put(verifyJWT, editUser);
router.route("/").delete(deleteAllUsers);
router.route("/transactions").get(verifyJWT, getUserTransactions);
router.route("/me").get(verifyJWT, getUser);

export default router;
