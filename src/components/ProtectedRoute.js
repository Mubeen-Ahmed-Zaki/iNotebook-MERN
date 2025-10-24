import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // agar token nahi hai to login page pe bhej do
    return <Navigate to="/login" replace />;
  }

  // agar token hai to children render karo
  return children;
};

export default ProtectedRoute;
