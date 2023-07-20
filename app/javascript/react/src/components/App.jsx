import { useContext } from "react";
import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./sign_up/SignUp";
import Home from "./home/Home";
import Login from "./login/Login";
import { LoggedProvider } from "./context/Logged";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./user/UserDashboard";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route element={<Home />} path="/home" /> 
          <Route element={<AdminDashboard />} path="/admin/dashboard" /> 
          <Route element={<UserDashboard />} path="/user/dashboard" /> 
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoggedProvider>
      <App />
    </LoggedProvider>
  </React.StrictMode>
);

export default App;
