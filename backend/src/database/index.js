import mongoose from "mongoose";
import { DB_NAME } from "../../contants.js";

export const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log("Error");
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
