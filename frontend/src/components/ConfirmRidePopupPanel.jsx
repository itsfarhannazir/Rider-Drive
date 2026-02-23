import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const ConfirmRidePopupPanel = (props) => {

  const [otp , setOtp] = useState('')
  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFormSubmit =  async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride` , {
        params : {
          rideId  : props.ride._id , 
        },
        headers : {
          Authorization : `Bearer ${localStorage.getItem("token")}`
        }
      })
  
      if (res.status === 200) {
        navigate("/captain-riding" , {state : {ride : props.ride}})
      }
    } catch (error) {
      throw new Error(error.message);
    }finally{
      setLoading(false);
    }
    
  }

  return (
     <div className="w-full">
          <h3
            onClick={() => {
              props.setCofirmRidePopUpPanel(false )
            }}
            className="text-center text-3xl text-gray-500 mb-2"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h3>
    
          <h2 className="font-semibold text-2xl mb-6">Confirm this ride to start</h2>
    
    {/* User Ride Reuest */}
          <div className="p-4 flex items-center justify-between rounded-xl
          border-2 border-amber-400 ">
            <div className="flex items-center gap-2 ">
              <h4 className="text-lg font-semibold">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h4>
            </div>
    
            <div className="text-center">
              <h3 className="text-xl font-medium">{props.ride?.distance} km</h3>
            </div>
          </div>
    
          <div className="flex flex-col gap-3">
            <div>
              
              <div className="flex items-center justify-center gap-6 w-full mt-3 border-b-2 border-gray-600 p-3">
                <i className="ri-map-pin-fill text-xl"></i>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Pick-up</h3>
                  <p className="font-semibold text-gray-600">
                    {props.ride?.pickup}
                  </p>
                </div>
              </div>
    
              <div className="flex items-center justify-center gap-6 w-full mt-3 border-b-2 border-gray-600 p-3">
                <i className="ri-map-pin-2-line text-xl"></i>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">destination</h3>
                  <p className="font-semibold text-gray-600">
                     {props.ride?.destination}
                  </p>
                </div>
              </div>
    
              <div className="flex items-center justify-center gap-6 w-full mt-3 p-3">
                <i className="ri-money-dollar-box-line text-xl"></i>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">₹{props.ride?.fare}</h3>
                  <p className="font-semibold text-gray-600">Cash Cash</p>
                </div>
              </div>
            </div>
    
           <form
            onSubmit={handleFormSubmit}
            className='flex flex-col items-center gap-2'>

              <button
              className= {`flex justify-center  py-3 w-full rounded-lg text-white font-semibold mt-5 ${loading? "bg-gray-400" : "bg-green-600"}`}
            >
              {loading ? "Starting ride..." : "Confirm"}
            </button>
    
            <button
              onClick={() => {
                props.setCofirmRidePopUpPanel(false )
              }}
              className="bg-red-600  py-3 w-full rounded-lg text-white font-semibold "
            >
              Cancel
            </button>


           </form>
          </div>
        </div>
  )
}

export default ConfirmRidePopupPanel
