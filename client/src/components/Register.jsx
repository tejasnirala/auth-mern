import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../utils/ApiURL";

const Register = () => {
  const navigateTo = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegister = async (data) => {
    data.phone = `+91${data.phone}`;
    await axios.post(`${API_URL}/api/v1/user/register`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      toast.success(res.data.message);
      navigateTo(`/otp-verification/${data.email}/${data.phone}`);
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  }

  return <>
    <form className="auth-form" onSubmit={handleSubmit((data) => handleRegister(data))}>
      <h2>Register</h2>
      <input type="text" placeholder="Name" required {...register("name")} />
      <input type="email" placeholder="Email" required {...register("email")} />
      <div>
        <span>+91</span>
        <input type="number" placeholder="Phone" required {...register("phone")} />
      </div>
      <input type="password" placeholder="Password" required {...register("password")} />
      <div className="verification-method">
        <p>Select Verification Method</p>
        <div className="wrapper">
          <label>
            <input type="radio" name="verificationMethod" value={"email"} required {...register('verificationMethod')}></input>
            Email
          </label>
          <label>
            <input type="radio" name="verificationMethod" value={"phone"} required {...register('verificationMethod')}></input>
            Phone
          </label>
        </div>
      </div>
      <button type="submit">Register</button>
    </form>
  </>
};

export default Register;
