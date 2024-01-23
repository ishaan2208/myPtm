import User from "../model/user.model.js";
import zod from "zod";
import jwt from "jsonwebtoken";

//zod

const createUserSchema = zod.object({
  username: zod.string().min(3).max(20),
  password: zod.string().min(6).max(20),
  firstName: zod.string().min(3).max(20),
  lastName: zod.string().min(3).max(20),
  balance: zod.number().optional(),
});

const updateUserSchema = zod.object({
  password: zod.string().min(6).max(20).optional(),
  firstName: zod.string().min(3).max(20).optional(),
  lastName: zod.string().min(3).max(20).optional(),
});

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filter = req.query.filter || "";
    const users = await User.find({
      _id: { $ne: loggedInUserId },
      $or: [
        { username: { $regex: filter || "", $options: "i" } },
        { firstName: { $regex: filter || "", $options: "i" } },
        { lastName: { $regex: filter || "", $options: "i" } },
      ],
    });
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("Please provide email and password");
    }
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    if (password !== user.password) {
      throw new Error("Invalid credentials");
    }
    const userId = user._id;
    const token = await jwt.sign({ userId }, process.env.TOKEN_SECRET);
    res.status(200).json({
      status: "success",
      data: user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const signUp = async (req, res) => {
  try {
    const { username, password, firstName, lastName, balance } = req.body;
    // if ([username, password, firstName, lastName].some((el) => !el)) {
    //   throw new Error("Please provide all fields");
    // }
    const { success } = createUserSchema.safeParse(req.body);

    if (!success) {
      throw new Error("Input validation failed");
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new Error("User already exists");
    }
    const user = await User.create({
      username,
      password,
      firstName,
      lastName,
      balance,
    });

    const userId = user._id;
    const token = await jwt.sign({ userId }, process.env.TOKEN_SECRET);

    res.status(200).json({
      status: "success",
      data: user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const editUser = async (req, res) => {
  try {
    const { success } = updateUserSchema.safeParse(req.body);
    if (!success) {
      res.status(400).json({
        status: "fail",
        message: "Input validation failed",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    ).select("-password");
    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    const users = await User.deleteMany();
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getUserTransactions = async (req, res) => {
  try {
    const userTransactions = await User.aggregate([
      {
        $match: {
          _id: req.user._id,
        },
      },
      {
        $lookup: {
          from: "transactions",
          localField: "_id",
          foreignField: "fromId",
          as: "transactions",
        },
      },
      {
        $unwind: "$transactions",
      },
      {
        $lookup: {
          from: "users",
          localField: "transactions.toId",
          foreignField: "_id",
          as: "toUser",
        },
      },
      {
        $addFields: {
          toId: "$transactions.toId",
          amount: "$transactions.amount",
          transaction_createdAt: "$transactions.createdAt",
          transaction_id: "$transactions._id",
          to_user: {
            $first: "$toUser",
          },
        },
      },
      {
        $addFields: {
          toUser_first: "$to_user.firstName",
          toUser_last: "$to_user.lastName",
        },
      },
      {
        $project: {
          amount: 1,
          toId: 1,
          transaction_createdAt: 1,
          transaction_id: 1,
          toUser_first: 1,
          toUser_last: 1,
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: userTransactions,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
