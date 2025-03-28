import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import OtpVerification from "./pages/OtpVerification";
import { API_URL } from "./utils/ApiURL";

const App = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const getUser = async () => {
      await axios.get(`${API_URL}/api/v1/user/me`, {
        withCredentials: true
      }).then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
      // eslint-disable-next-line no-unused-vars
      }).catch((err) => {
        setUser(null);
        setIsAuthenticated(false);
      });
    }
    getUser();
  }, []);

  return <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/auth' element={<Auth />}></Route>
        <Route path='/otp-verification/:email/:phone' element={<OtpVerification />}></Route>
        <Route path='/password/forgot' element={<ForgotPassword />}></Route>
        <Route path='/password/reset/:token' element={<ResetPassword />}></Route>
        <Route path='*' element={<Navigate to={"/"} replace />}></Route>
      </Routes>
      <ToastContainer theme="colored"/>
    </Router>
  </>;
};

export default App;
