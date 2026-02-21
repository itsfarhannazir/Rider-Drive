import React, { useContext, useState } from "react";
import Logo from "../../public/logo.png";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import {userDataContext} from "../context/UserContext";
import toast from "react-hot-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fisrtName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {setUser} = useContext(userDataContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: fisrtName,
        lastname: lastName,
      },
      email,
      password, 
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);  
  
      if (response.status === 201) {
        setUser(response.data.user);
  
        navigate("/home")
        localStorage.setItem("token" , response.data.token);
        toast.success("Register Successfully")
      }
    } catch (error) {
      toast.error("User already exist")
    }

    setEmail("");
    setPassword("");
    setFisrtName("");
    setLastName("");
  };

  return (
    <>
      <div className=" h-screen flex flex-col justify-between">
        <div>
          <img className="w-25 mt-3" src={Logo} alt="" />

          <form onSubmit={handleFormSubmit} className="p-7">
            <h3 className="mb-4 font-semibold text-xl">Enter your name</h3>
            <div className="flex gap-3">
              <input
                value={fisrtName}
                className="bg-[#eeeeee] w-full px-4 py-3 rounded placeholder:font-medium mb-5"
                type="text"
                placeholder="First name"
                onChange={(e) => {
                  setFisrtName(e.target.value);
                }}
              />
              <input
                value={lastName}
                className="bg-[#eeeeee] w-full px-4 py-3 rounded placeholder:font-medium mb-5"
                type="text"
                placeholder="Last name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>

            <h3 className="mb-4 font-semibold text-xl">Enter your e-mail</h3>
            <input
              value={email}
              className="bg-[#eeeeee] w-full px-4 py-3 rounded placeholder:font-medium mb-5"
              type="email"
              placeholder="email@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <h3 className="mb-4 font-semibold text-xl">Password</h3>
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
              Create Account
            </button>
          </form>

          <p className="text-center">
            Already have account?{" "}
            <Link to="/user-login" className="text-blue-600">
              Login from here
            </Link>
          </p>
        </div>

        <div className="p-7">
          <p className="text-[13px] text-gray-700">
            By signing in, you agree to our <span className='font-semibold underline'>Privacy Policy</span> and <span className='font-semibold underline'>Terms of Service</span>, which describe how we collect and use your information.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
