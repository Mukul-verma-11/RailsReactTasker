import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleBtn = () => {
    console.log('SignUp success');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(password);
    const authenticityToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    axios({
      method: "post",
      url: "http://localhost:3000/users",
      data: {
        user: {
          email: email,
          password: password,
        },
      },
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": authenticityToken,
      },
    })
      .then(
        (res) => {
          const token = res.headers["authorization"].split(' ')[1]
          localStorage.setItem('authtoken',token)
          navigate("/login")
        }
      )
      .catch((err) => console.log("err", err));
  };
  return (
    <div className="signup">
      <div className="signup_box">
        <h1>SIGN UP</h1>

        <form className="sign_form" onSubmit={(e) => handleSubmit(e)} action="">
          <input placeholder="E-mail" className="sign_input"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="text"
          />
          <br />
          <input placeholder="Password"  className="sign_input"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            type="text"
          />
          <button className='sign_up_btn' onClick={handleBtn} >
            SIGN UP
          </button>

          <p>
        Already have an account  
        <a className="a_tag" href="/login">Login</a>
        </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
