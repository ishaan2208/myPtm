import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

export default function Transacton() {
  const token = localStorage.getItem("token");
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5010/api/v1/users/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setTransaction(res.data.data);
      });
  }, []);
  return (
    <div className=" max-w-[320px] text-white">
      <h1 className=" text-center text-2xl font-extrabold mb-6 underline">
        Transaction
      </h1>
      <div className=" w-full">
        {transaction.reverse().map((tr) => (
          <div
            key={tr._id}
            className=" bg-gray-800/30 my-2 p-8 rounded-xl border-[1px] border-slate-600/50 mb-6 shadow-sm shadow-black hover:scale-[1.04] hover:shadow-lg transition-all duration-300 hover:shadow-black hover:cursor-pointer"
          >
            <div className=" mb-2 flex  justify-between items-start">
              <div className=" mb-2 pr-6">
                {" "}
                <h1 className=" text-lg font font-extrabold uppercase">
                  {tr.toUser_first} {tr.toUser_last}
                </h1>
                <h2 className=" text-slate-500 font-extralight text-xs">
                  {tr._id}
                </h2>
              </div>
              <div className=" flex justify-center items-center w-full">
                <p className="text-xs ring-1 ring-green-500 px-2 py-1 rounded-md text-green-500">
                  Success
                </p>
              </div>
            </div>
            <div className=" mb-2 flex flex-col lg:flex-row justify-between items-start">
              <div className="mr-12">
                {" "}
                <h2 className=" text-slate-400 font-light text-xs">Amount</h2>
                <h1 className=" text-md font-bold mb-2">₹{tr.amount / 100}</h1>
              </div>
              <div>
                {" "}
                <h2 className=" text-slate-400 font-light text-xs">
                  Date and Time
                </h2>
                <h1>
                  {format(
                    tr.transaction_createdAt,
                    "do-LLLL-yyyy KK:mm:ss aaa"
                  )}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
