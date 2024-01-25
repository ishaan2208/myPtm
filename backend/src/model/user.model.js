import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    firstName: {
      type: String,
      required: [true, "Please provide a fisrtName"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a lastName"],
    },
    balance: {
      type: Number,
      default: 100000,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
