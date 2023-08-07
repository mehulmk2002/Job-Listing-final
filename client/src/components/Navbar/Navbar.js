import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import useJobContext from "../../hooks/useJobContext";

const Navbar = () => {
  const navigate = useNavigate();

  
  const { loggedIn, setLoggedIn } = useJobContext();

  const loginPage = () => {
    navigate("/login");
  };

  const signupPage = () => {
    navigate("/register");
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="header">
      <div className="job__title">JobFinder</div>
      {loggedIn ? (
        <div className="user__icon">
          <button onClick={logout}>Logout</button>
          <span>Hello Recruiter!</span>
          <img
            src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
            alt=""
          />
        </div>
      ) : (
        <div className="signup__buttons">
          <button className="header__login" onClick={loginPage}>
            Login
          </button>
          <button className="header__register" onClick={signupPage}>
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
