import React, { useContext, useState } from "react";
import "../styles/Auth.css";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";

const Auth = () => {
  const {isAuthenticated} = useContext(Context);
  const [isLogin, setIsLogin] = useState(true);

  if(isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return <>
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-toggle">
          <button onClick={() => setIsLogin(true)} className={`toggle-btn ${isLogin ? "active" : ""}`}>Login</button>
          <button onClick={() => setIsLogin(false)} className={`toggle-btn ${!isLogin ? "active" : ""}`}>Register</button>  
        </div>
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  </>;
};

export default Auth;
