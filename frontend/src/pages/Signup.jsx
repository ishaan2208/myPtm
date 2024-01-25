import React from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tokenState } from "../recoil/token.recoil";

export default function Signup() {
  const [data, setData] = useRecoilState(tokenState);
  console.log(data);

  const navigate = useNavigate();
  const signUpSchema = z.object({
    username: z.string().email(),
    lastName: z.string().min(2),
    firstName: z.string().min(2),
    password: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" }),
  });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = (data) => {
    axios
      .post("https://my-ptm.vercel.app/api/v1/users/signup", data)
      .then((res) => {
        console.log(res.data);
        setData(res.data.token);
      })
      .then(() => {
        navigate("/");
      });
    console.log(data);
  };
  return (
    <div className=" min-h-screen bg-gradient-to-tr from-black via-slate-900 to-black flex flex-col items-center text-white">
      <div className=" my-24 rounded-lg lg:px-12 py-6 border-[1px] border-slate-600/20 min-w-64 px-4">
        <h1 className=" text-white text-3xl mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {" "}
          <Input
            title="Username"
            error={errors.username}
            {...register("username")}
          />
          <Input
            title="Firstname"
            {...register("firstName")}
            error={errors.firstName}
          />
          <Input
            title="Lastname"
            {...register("lastName")}
            error={errors.lastName}
          />
          <Input
            title="Password"
            type="password"
            {...register("password")}
            error={errors.password}
          />
          {/* <Input title="Confirm Password" type="password" /> */}
          <button
            className=" w-full bg-blue-500 text-white rounded-lg py-3 mt-4 hover:bg-blue-600 duration-200 mb-3"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className=" flex items-center justify-center flex-col">
          <p className=" text-slate-500">Already have an account ??</p>
          <button
            className=" font-bold text-center px-2 py-1 rounded-lg"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log In
          </button>
        </div>

        <button></button>
      </div>
    </div>
  );
}
