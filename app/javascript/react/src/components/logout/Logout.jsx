import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedContext } from "../context/Logged";

const Logout = () => {
  const navigate = useNavigate();

  const logState = useContext(LoggedContext);

  const handleLogout = () => {
    axios({
      method: "delete",
      url: "http://localhost:3000/users/sign_out",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
      },
    });

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
