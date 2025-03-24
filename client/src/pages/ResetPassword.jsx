import React, { useContext, useState } from "react";
import "../styles/ResetPassword.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import { API_URL } from "../utils/ApiURL";

const ResetPassword = () => {
  const {  isAuthenticated, setIsAuthenticated, setUser  } = useContext(Context);
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/api/v1/user/password/reset/${token}`, { password, confirmPassword }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  }

  if(isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="reset-password-page">
        <div className="reset-password-container">
          <h2>Reset Password</h2>
          <p>Enter your new password below.</p>
          <form className="reset-password-form" onSubmit={handleResetPassword}>
            <input className="reset-input" type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <input className="reset-input" type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
            <button className="reset-btn" type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
