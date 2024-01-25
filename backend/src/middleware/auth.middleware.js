import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token =
      (await req.headers.authorization?.replace("Bearer ", "")) || "";
    if (!token) {
      throw new Error("Invalid credentials");
    }
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decoded) {
      throw new Error("Invalid Jwt");
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error("Invalid jwt");
    }
    req.user = user;
    console.log(`User: ${req.user}`);
    next();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
