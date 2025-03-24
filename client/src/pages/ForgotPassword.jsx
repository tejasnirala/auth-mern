import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../main";
import { API_URL } from "../utils/ApiURL";

const ForgotPassword = () => {
  const [ email, setEmail ] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/api/v1/user/password/forgot`, {email}, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      toast.success(res.data.message);
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  }

  return <>
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <p>Enter your registered email address to receive a password reset token.</p>
        <form className="forgot-password-form" onSubmit={handleForgotPassword}>
          <input className="forgot-input" type="email" placeholder="Enter you email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <button className="forgot-btn" type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  </>;
};

export default ForgotPassword;
