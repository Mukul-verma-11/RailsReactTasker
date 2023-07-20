import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedContext } from "../context/Logged";
import apiClient from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logState = useContext(LoggedContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const authenticityToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    apiClient
      .post(
        "/users/sign_in",
        {
          user: {
            email: email,
            password: password,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": authenticityToken,
          },
        }
      )
      .then((res) => {
        const token = res.headers["authorization"].split(" ")[1];
        console.log("responses", res);
        localStorage.setItem("authtoken", token);
        localStorage.setItem(
          "accessToken",
          JSON.stringify({ email: res.data.email, role: res.data.role })
        );
        logState.setLog(logState.log + 1);
        console.log(logState.log);
        if (res.data.role == 0) {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleBtn = () => {
    console.log("cllicked login");
  };
  return (
    <div className="signup">
      <div className="signup_box">
        <h1>LOGIN</h1>
        <form className="sign_form" onSubmit={(e) => handleSubmit(e)} action="">
          <input
            className="sign_input"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="text"
          />

          <br />

          <input
            className="sign_input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            type="text"
          />

          <button onClick={handleBtn} className="sign_up_btn">
            LOGIN
          </button>

          <p>
            Don't have an account
            <a className="a_tag" href="/signup">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
