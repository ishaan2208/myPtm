import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const navItems = [
    {
      name: "Payment",
      to: "/",
    },
    {
      name: "Transactions",
      to: "/transactions",
    },
  ];
  return (
    <div className=" w-full text-white">
      <nav className=" flex justify-between lg:px-6 py-3 items-center pr-3">
        <div className=" flex items-baseline">
          <h1 className=" text-2xl font-extrabold italic hidden lg:block">
            PayZupp
          </h1>
          <div className=" text-white ml-10">
            {navItems.map((i) => {
              return (
                <NavLink
                  key={i.name}
                  className={({ isActive }) => {
                    return `ml-2 lg:ml-4 ${
                      isActive ? "text-blue-200 font-bold" : ""
                    }`;
                  }}
                  to={i.to}
                >
                  {i.name}
                </NavLink>
              );
            })}
          </div>
        </div>
        <button
          className=" bg-red-600  px-2 py-2 rounded-xl hover:bg-red-700"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </nav>
    </div>
  );
}
