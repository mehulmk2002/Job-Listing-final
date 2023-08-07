import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASEURL from "../../constants/baseurl";

import userPageImage from "../../assets/userpageImages/userpage.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signupRedirect = () => {
    navigate("/register");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    setLoading(true);
    axios
      .post(`http://localhost:4000/login`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("token", response.data.token);
      
        navigate("/");
      })
      .catch((error) => {
        toast.error("Incorrect Email or Password. Try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
        console.error("Login failed", error); 
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login__page">
      <div className="login__page__left">
        <div className="login__title">
          <h1>Already have an account?</h1>
          <span>Your personal job finder is here</span>
        </div>
        <div className="login__form">
          <input
            value={email}
            onChange={handleEmail}
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={handlePassword}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="login__footer">
          <button id="login__signin" onClick={login} disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
          <div className="login__footer__text">
            <span>Don't have an account? </span>
            <u onClick={signupRedirect}>Sign Up</u>
          </div>
        </div>
      </div>
      <div className="login__page__right">
        <img src={`${userPageImage}`} alt="" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
