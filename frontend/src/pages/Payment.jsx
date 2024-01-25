import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenState } from "../recoil/token.recoil";
import axios from "axios";
import Input from "../components/Input";

export default function Payment() {
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState([]);
  const [payee, setPayee] = useState("");
  const token = localStorage.getItem("token");
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [bool, setBool] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [userLoader, setUserLoader] = useState(false);

  const payhandle = (id) => {
    console.log(id);
    setLoader(true);
    axios
      .post(
        "https://my-ptm.vercel.app/api/v1/transactions",
        {
          amount: amount * 100,
          toId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set Content-Type as needed
          },
        }
      )
      .then((res) => {
        console.log(res);
        setLoader(false);
        setBalance((bal) => bal - amount * 100);
        setAmount(0);
        setPayee("");
      });
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.log("No token found");
  //     return;
  //   }
  //   setToken(token);
  // }, []);

  useEffect(() => {
    console.log(token);
    setUserLoader(true);
    if (!token) {
      console.log("No token found");
      return;
    }
    axios
      .get(`http://localhost:5010/api/v1/users/getUsers?filter=${payee}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setUser(res.data.data);
        setUserLoader(false);
        console.log(user);
      });
  }, [payee]);

  useEffect(() => {
    setLoader(true);
    axios
      .get("https://my-ptm.vercel.app/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);

        setBalance(res.data.data.balance);
        setLoader(false);
      });
  }, [refresh]);

  return loader ? (
    <>
      <h1>Loading...</h1>
    </>
  ) : (
    <>
      <div className="min-w-64">
        <div className=" flex justify-end">
          <div
            className=" bg-indigo-500 p-2 rounded-lg hover:cursor-pointer"
            onClick={() => {
              setBool(true);
              setTimeout(() => {
                setBool(false);
                setRefresh((ref) => ref + 1);
              }, [500]);
            }}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 text-white duration-700 ${
                bool ? "animate-spin" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        </div>
        <div className=" w-full rounded-xl mb-4 ">
          {/* <h1>Name</h1>
          <h1>hello</h1> */}
          <label className=" text-slate-400 font-bold">Amount</label>
          <Input
            type="text"
            className=" w-full px-2 py-1 rounded-lg mt-2"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></Input>
          <p className=" font-semibold text-slate-200 italic mt-[-15px]">
            Your current balance is ₹{balance / 100}
          </p>
        </div>
        {/* <h1 className=" text-2xl font-semibold mt-8">Select Payee</h1> */}
        <h1 className=" text-center text-xl uppercase font-bold underline mb-6">
          Payees
        </h1>
        <label htmlFor="" className=" text-slate-400 pb-2 font-bold mt-8">
          Search Payee
        </label>
        <Input
          type="text"
          placeholder="Search Payee"
          value={payee}
          onChange={(e) => setPayee(e.target.value)}
          className=" w-full mt-2"
        />
        <div className=" flex flex-col w-full my-4">
          {userLoader ? (
            <>Loading...</>
          ) : (
            user.map((u) => {
              return (
                <div
                  className=" bg-gray-800/30 my-2 p-8 rounded-xl border-[1px] border-slate-600/50 flex justify-between items-center"
                  key={u._id}
                >
                  <div>
                    <h1 className=" uppercase font-bold text-sm">
                      {u.firstName} {u.lastName}
                    </h1>
                    <h1 className=" font-light text-slate-400 text-xs">
                      {u.username}
                    </h1>
                  </div>
                  <button
                    className=" bg-green-500 px-4 py-1 rounded-lg hover:bg-green-600 duration-200"
                    onClick={() => {
                      payhandle(u._id);
                    }}
                  >
                    Pay
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
