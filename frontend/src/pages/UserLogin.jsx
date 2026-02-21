import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../public/logo.png";
import { useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(userDataContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData,
      );

      if (response.status === 201) {
        setUser(response.data.user);
        navigate("/home");
        localStorage.setItem("token" , response.data.token);
        toast.success("Login Successfully");
      }
    } catch (error) {
      toast.error("Invalid email or password");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className=" h-screen flex flex-col justify-between">
        <div>
          <img className="w-25 mt-3" src={Logo} alt="" />
          <form onSubmit={handleFormSubmit} className="p-7">
            <h3 className="mb-3 font-semibold text-2xl">What's your email</h3>
            <input
              value={email}
              className="bg-[#eeeeee] w-full px-4 py-3 rounded placeholder:font-medium mb-5"
              type="email"
              placeholder="email@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <h3 className="mb-3 font-semibold text-2xl">Password</h3>
            <input
              value={password}
              className="bg-[#eeeeee] w-full px-4 py-3 rounded placeholder:font-medium mb-5"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className="font-semibold text-white py-2 w-full rounded bg-black mt-2">
              Login
            </button>
          </form>

          <p className="text-center">
            New here?{" "}
            <Link to="/user-signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </div>

        <div className="p-7">
          <Link
            to="/captain-login"
            className=" inline-block text-center font-semibold text-white py-2 w-full rounded bg-green-600 mt-2"
          >
            Log-in as Captain
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
