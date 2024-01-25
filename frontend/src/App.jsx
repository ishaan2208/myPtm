import axios from "axios";
import { useEffect, useState } from "react";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { tokenState } from "./recoil/token.recoil";

function App({ children }) {
  const navigate = useNavigate();

  return (
    <div className=" min-h-screen bg-gradient-to-tr from-slate-950 via-slate-900 to-black text-white ">
      <Header />
      <div className=" w-full flex items-center justify-center h-full mt-12">
        {children}
      </div>
      {/* <div
        className=" bg-blue-800 p-2 rounded-lg"
        onClick={() => {
          setBool(true);
          setTimeout(() => {
            setBool(false);
          }, [2000]);
        }}
      >
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

      <button
        className=" bg-green-500 text-white rounded-lg py-3 px-6 mt-4 hover:bg-green-600 duration-200 mb-8"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign Up
      </button> */}
    </div>
  );
}

export default App;
