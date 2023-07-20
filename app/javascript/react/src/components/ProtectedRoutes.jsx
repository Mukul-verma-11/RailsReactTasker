import { Navigate, Outlet } from "react-router-dom";
import React from 'react'

const ProtectedRoutes = () => {
  const auth = JSON.parse(localStorage.getItem("accessToken"));
  return (
    auth?.email ? auth?.role == 0 || 1 ? <Outlet/> : <Navigate to="/login" /> :  <Navigate to="/login" />
  )
};

export default ProtectedRoutes;
