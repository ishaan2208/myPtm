import React, { useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";

export default function AuthLayout({ auth = false, children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token && auth) {
      navigate("/login");
    } else if (token && !auth) {
      navigate("/");
    } else if (!token && !auth) {
      navigate("/");
    }
  }, []);

  return <div>{children}</div>;
}
