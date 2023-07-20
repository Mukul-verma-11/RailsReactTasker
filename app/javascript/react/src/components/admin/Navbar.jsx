import * as React from "react";
import Clock from "../Clock";
import Logout from "../logout/Logout";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img className="logo_img" src="../logo.png" alt="demo" />
      </div>

      <div className="menu">
        <div className="clock">
        <Logout />
          <h2>
            <Clock />
          </h2>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
