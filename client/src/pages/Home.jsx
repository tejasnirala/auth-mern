import React, { useContext } from "react";
import Hero from "../components/Hero";
import Instructor from "../components/Instructor";
import Technologies from "../components/Technologies";
import "../styles/Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import Footer from "../layout/Footer";
import { API_URL } from "../utils/ApiURL";

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  const handleLogout = async () => {
    await axios.get(`${API_URL}/api/v1/user/logout`, {
      withCredentials: true
    }).then((res) => {
      toast.success(res.data.message);
      setUser(null);
      setIsAuthenticated(false);
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  }

  if (!isAuthenticated) {
    return <Navigate to={"/auth"} />;
  }
  return <>
    <section className="home">
      <Hero />
      <Instructor />
      <Technologies />
      <Footer />
      <button onClick={handleLogout}>Logout</button>
    </section>
  </>;
};

export default Home;
