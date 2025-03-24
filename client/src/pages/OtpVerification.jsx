import React, { useContext, useState } from "react";
import "../styles/OtpVerification.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import { API_URL } from "../utils/ApiURL";

const OtpVerification = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const { email, phone } = useParams();
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  }

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    await axios.post(`${API_URL}/api/v1/user/otp-verification`, { email, phone, otp: enteredOtp }, {
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
      setIsAuthenticated(false);
      setUser(null);
    });
  }

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return <>
    <div className="otp-verification-page">
      <div className="otp-container">
        <h1>OTP Verification</h1>
        <p>Enter the 5-digit OTP sent to your registered email or phone.</p>
        <form className="otp-form" onSubmit={handleOtpVerification}>
          <div className="otp-input-container">
            {
              otp.map((digit, index) => {
                return (
                  <input className="otp-input" id={`otp-input-${index}`} type="text" maxLength={"1"} key={index} value={digit} onChange={(e) => handleChange(e.target.value, index)} onKeyDown={(e) => handleKeyDown(e, index)} />
                )
              })
            }
          </div>
          <button className="verify-button" type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  </>;
};

export default OtpVerification;
