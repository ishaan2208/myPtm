import mongoose from "mongoose";
import Transaction from "../model/transaction.model.js";
import User from "../model/user.model.js";

export const createTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { toId, amount } = req.body;
    const fromId = req.user._id;
    const fromUser = await User.findById(fromId).session(session);
    console.log(fromId);
    if (!fromUser || fromUser.balance < amount) {
      console.log("Invalid user or Insufficient balance");
    }
    const toUser = await User.findById(toId);
    console.log(toUser);
    if (!toUser) {
      console.log("Invalid user");
      await session.abortTransaction();
    }
    const transaction = await Transaction.create(
      [
        {
          fromId,
          toId,
          amount,
        },
      ],
      { session }
    );
    const fromNewUser = await User.findByIdAndUpdate(
      fromId,
      {
        $inc: { balance: -amount },
      },
      { new: true }
    ).session(session);
    const toNewUser = await User.findByIdAndUpdate(
      toId,
      {
        $inc: { balance: amount },
      },
      { new: true }
    ).session(session);
    await session.commitTransaction();
    res.status(200).json({
      status: "success",
      data: transaction,
      fromUserBalance: fromNewUser.balance,
      toUserBalance: toNewUser.balance,
    });
  } catch (error) {
    // await session.abortTransaction();
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  } finally {
    // session.endSession();
  }
};
