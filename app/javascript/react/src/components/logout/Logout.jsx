import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedContext } from "../context/Logged";
import apiClient from "../api";

const Logout = () => {
  const navigate = useNavigate();

  const logState = useContext(LoggedContext);

  const handleLogout = () => {

    const authenticityToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    apiClient.delete("/users/sign_out",{
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": authenticityToken,
      },
    })

    localStorage.removeItem("authtoken");
    localStorage.removeItem("accessToken");
    logState.setLog(logState.log + 1);

    navigate("/login");
  };

  return (
    <div>
      <button className="logout_btn" onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default Logout;
