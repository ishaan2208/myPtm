import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { RecoilRoot } from "recoil";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Payment from "./pages/Payment.jsx";
import Transacton from "./pages/Transacton.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: (
          <App>
            <Outlet />
          </App>
        ),

        children: [
          {
            path: "/",
            element: (
              <AuthLayout auth={true}>
                <Payment />
              </AuthLayout>
            ),
          },
          {
            path: "transactions",
            element: (
              <AuthLayout auth={true}>
                <Transacton />
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);
