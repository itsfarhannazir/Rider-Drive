import React, { useContext, useState } from "react";
import Logo from "../../public/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { captainDataConetxt } from "../context/CaptainContext";
import axios from "axios";
import toast from "react-hot-toast";

const CaptainSignUp = () => {
  const [email, setEmail] = useState("");
  const [fisrtName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");

  const { setCaptain } = useContext(captainDataConetxt);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullname: {
        firstname: fisrtName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        color: vehicleColor,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      newCaptain,
    );
    
    setCaptain(response.data.captain);
    
    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
      navigate("/captain-home");
      toast.success("Register Successfully")
    }

    setFisrtName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleCapacity('');
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleType("");
  };

  return (
    <>
      <div className=" h-screen flex flex-col justify-between">
        <div>
          <img className="w-25 mt-3" src={Logo} alt="" />

          <form onSubmit={handleFormSubmit} className="p-7">
            <h3 className="mb-4 font-semibold text-xl">Enter captain's name</h3>
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

            <h3 className="mb-4 font-semibold text-xl">
              Enter captain's e-mail
            </h3>
            <input
              value={email}
              className="bg-[#eeeeee] w-full px-4 py-3 rounded placeholder:font-medium mb-5"
              type="email"
              placeholder="captain@example.com"
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

            <h3 className="mb-4 font-semibold text-xl">Enter vehicle info</h3>
            <div className="flex flex-wrap gap-3">
              <input
                value={vehiclePlate}
                className="bg-[#eeeeee] w-[48%] px-4 py-3 rounded placeholder:font-medium mb-5"
                type="text"
                placeholder="Vehicle number"
                onChange={(e) => {
                  setVehiclePlate(e.target.value);
                }}
              />
              <input
                value={vehicleCapacity}
                className="bg-[#eeeeee] w-[48%] px-4 py-3 rounded placeholder:font-medium mb-5"
                type="number"
                placeholder="Vehicle Capapcity"
                onChange={(e) => {
                  setVehicleCapacity(e.target.value);
                }}
              />
              <input
                value={vehicleColor}
                className="bg-[#eeeeee] w-[48%] px-4 py-3 rounded placeholder:font-medium mb-5"
                type="text"
                placeholder="Vehicle Color"
                onChange={(e) => {
                  setVehicleColor(e.target.value);
                }}
              />
              <select
                value={vehicleType}
                className="bg-[#eeeeee] w-[48%] px-4 py-3 rounded placeholder:font-medium mb-5"
                onChange={(e) => {
                  setVehicleType(e.target.value);
                }}
              > 
                <option value="" disabled>Select vehicle</option>
                <option value="Car">Car</option>
                <option value="Auto">Auto</option>
                <option value="Moto">Moto</option>
              </select>
            </div>

            <button className="font-semibold text-white py-2 w-full rounded bg-black mt-2">
              Create account as captain
            </button>
          </form>

          <p className="text-center">
            Already have account?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login from here
            </Link>
          </p>
        </div>

        <div className="p-7">
          <p className="text-[13px] text-gray-700">
            By signing in, you agree to our{" "}
            <span className="font-semibold underline">Privacy Policy</span> and{" "}
            <span className="font-semibold underline">Terms of Service</span>,
            which describe how we collect and use your information.
          </p>
        </div>
      </div>
    </>
  );
};

export default CaptainSignUp;
