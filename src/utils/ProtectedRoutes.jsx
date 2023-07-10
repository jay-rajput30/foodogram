import React, { useContext } from "react";
import { useAuth } from "../context/AuthProvider";

import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { loginStatus } = useAuth();

  return loginStatus ? children : <Navigate to="/feed" />;
};

export default ProtectedRoutes;
