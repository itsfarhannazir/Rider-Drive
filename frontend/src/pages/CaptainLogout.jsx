import axios from 'axios';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(()=>{
    try {
      const logoutCaptain = async()=>{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout` , {
          headers : {
            Authorization : `Bearer ${token}`
          }
        })

        if (res.status ===201) {
          localStorage.removeItem("token")
          navigate("/captain-login")
          toast.success("Logout succesfully");
        }
        
      }

      logoutCaptain();
      
    } catch (error) {
      console.error("Logout failed", err);
      toast.error("Logout failed")
    }
    

  } , [token , navigate])

  return (
    <div>
      Captain Logout
    </div>
  )
}

export default CaptainLogout
