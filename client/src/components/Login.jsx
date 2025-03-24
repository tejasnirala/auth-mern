import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  const navigateTo = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = async (data) => {
    await axios.post("http://localhost:3000/api/v1/user/login", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
      navigateTo("/");
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  }
  return <>
    <form className="auth-form" onSubmit={handleSubmit((data) => handleLogin(data))}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" required {...register("email")} />
      <input type="password" placeholder="Password" required {...register("password")} />
      <p className="forgot-password">
        <Link to={"/password/forgot"}>Forgot Password?</Link>
      </p>
      <button type="submit">Login</button>
    </form>
  </>;
};

export default Login;
