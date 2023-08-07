import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userPageImage from "../../assets/userpageImages/userpage.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useJobContext from "../../hooks/useJobContext";
import BASEURL from "../../constants/baseurl";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setLoggedIn } = useJobContext();

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value.trim());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
    setEmailError("");
    setFormError("");
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value.trim());
    setMobileError("");
    setFormError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
    setFormError("");
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    }
  };

  const validateMobile = () => {
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      setMobileError("Mobile number should be 10 digits");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !mobile || !password) {
      setFormError("Please fill in all the fields");
      return;
    }

    validateEmail();
    validateMobile();

   
    if (!emailError && !mobileError) {
      setLoading(true);
      axios
        .post(`http://localhost:4000/signup`, {
          name: name,
          email: email,
          mobile: mobile,
          password: password,
        })
        .then((res) => {
          console.log("here");
          if (res.status === 409) {
            toast.error("User already exists. Please Login!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
            });
            setTimeout(() => {
              navigate("/register");
            }, 2000); 
            return;
          }
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.name);
          toast.success("Registration Successful", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
          });
          setLoggedIn(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
          console.log("here1");
        })
        .catch((err) => {
          console.log("here2");
          console.log(err);
          if (err.response.status === 409) {
            toast.error("User already exists. Please Login!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
            });
            setTimeout(() => {
              navigate("/register");
            }, 2000); 
            return;
          }
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
          });
          setTimeout(() => {
            navigate("/register");
          }, 2000); 
          setFormError(err.response.data.message);
          console.log("here3");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setFormError("Please fill in all the fields");
      toast.error("Please fill in all the fields", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });

      setTimeout(() => {
        navigate("/register");
      }, 2000); 
    }
  };

  const loginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="register__page">
      <div className="register__page__left">
        <div className="register__title">
          <h1>Create an account</h1>
          <span>Your personal job finder is here</span>
        </div>
        <div className="register__form">
          <div>
            <input
              value={name}
              onChange={handleNameChange}
              type="name"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              value={email}
              onChange={handleEmailChange}
              onBlur={validateEmail}
              type="email"
              placeholder="Email"
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div>
            <input
              value={mobile}
              onChange={handleMobileChange}
              onBlur={validateMobile}
              type="mobile"
              placeholder="Mobile"
            />
            {mobileError && <p className="error-message">{mobileError}</p>}
          </div>
          <div>
            <input
              value={password}
              onChange={handlePasswordChange}
              type="password"
              placeholder="Password"
            />
            {formError && <p className="error-message">{formError}</p>}
          </div>
        </div>
        <div className="register__footer">
          <button
            id="register__create__account"
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Create Account"}
          </button>
          <div className="register__footer__text">
            <span>Already have an account? </span>
            <u onClick={loginRedirect}>Sign In</u>
          </div>
        </div>
      </div>
      <div className="register__page__right">
        <img src={`${userPageImage}`} alt="" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
