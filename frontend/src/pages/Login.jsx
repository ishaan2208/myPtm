import React from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { tokenState } from "../recoil/token.recoil";
import { useRecoilState } from "recoil";

export default function Login() {
  const navigate = useNavigate();

  const [token, setToken] = useRecoilState(tokenState);
  const { handleSubmit, register, watch } = useForm();
  const onSubmit = (data) => {
    axios
      .post("https://my-ptm.vercel.app/api/v1/users/login", data)
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        navigate("/");
        console.log(res.data.token);
        console.log(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className=" min-h-screen bg-gradient-to-tr from-black via-slate-900 to-black flex flex-col items-center text-white">
      <div className=" mt-[10vh] rounded-lg px-12 py-6 border-[1px] border-slate-600/20">
        <h1 className=" text-white text-3xl mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {" "}
          <Input title="Username" {...register("username")} />
          {/* <Input title="Firstname" {...register("firstName")} />
          <Input title="Lastname" {...register("lastName")} /> */}
          <Input title="Password" type="password" {...register("password")} />
          {/* <Input title="Confirm Password" type="password" /> */}
          <button
            className=" w-full bg-blue-500 text-white rounded-lg py-3 mt-4 hover:bg-blue-600 duration-200 mb-8"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className=" flex items-center justify-center flex-col">
          <p className=" text-slate-500 ">Dont have an account ??</p>
          <button
            className=" font-bold text-center px-2 py-1 rounded-lg"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
