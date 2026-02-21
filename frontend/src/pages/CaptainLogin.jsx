import React , {useContext, useState} from 'react'
import Logo from "../../public/logo.png";
import { Link , useNavigate } from 'react-router-dom';
import { captainDataConetxt } from '../context/CaptainContext';
import axios from 'axios';
import toast from 'react-hot-toast';


const CaptainLogin =  () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setCaptain} = useContext(captainDataConetxt);
    const navigate = useNavigate();
  
    const handleFormSubmit = async (e) => {
          e.preventDefault();
  
          const captainData = {
            email,
            password
          };

        try {
          const resposne =  await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login` , 
              captainData
            )
            
            setCaptain(resposne.data.captain);

            if (resposne.status === 201) {
              localStorage.setItem("token" , resposne.data.token)
              navigate("/captain-home")
              toast.success("login successfully");
            }
        } catch (error) {
          toast.error("Inavlid email or password")
        }
          
          setEmail('')
          setPassword('') 
    }
  
  return (
    <>
    <>
      <div className=" h-screen flex flex-col justify-between">
        <div>

          <img className="w-25 mt-3" src={Logo} />

          <form onSubmit={handleFormSubmit} className="p-7">
            <h3 className="mb-3 font-semibold text-2xl">What's your email</h3>
            <input
            value={email}
              className="bg-[#eeeeee] w-full px-4 py-3 rounded placeholder:font-medium mb-5"
              type="email"
              placeholder="captain@example.com"
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
            />

            <h3 className="mb-3 font-semibold text-2xl">Password</h3>
            <input
            value={password}
              className="bg-[#eeeeee] w-full px-4 py-3 rounded placeholder:font-medium mb-5"
              type="password"
              placeholder="Password"
                onChange={(e)=>{
                setPassword(e.target.value);
              }}
            />

            <button className="font-semibold text-white py-2 w-full rounded bg-black mt-2">
              Login
            </button>
          </form>

          <p className="text-center">
            Join a fleet?{" "}
            <Link to="/captain-signup" className="text-blue-600">
              Register as a Captain
            </Link>
          </p>
        </div>

        <div className="p-7">
          <Link to="/user-login" className=" inline-block text-center font-semibold text-white py-2 w-full rounded bg-orange-500 mt-2">
            Log-in as a User
          </Link>
        </div>
      </div>
    </>
    </>
  )
}

export default CaptainLogin
