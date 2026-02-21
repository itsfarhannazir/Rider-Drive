import { Link } from "react-router-dom";
import driver from "../../public/driver.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {

  const navigate = useNavigate();


  const rideCompleted = async () => {
    
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/ride-completed`,
        { rideId: props.rideData._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      navigate("/captain-home")
    } catch (error) {
      console.log(error);
    }
  };


  return (
      <div className="w-full">
          <h3
            onClick={() => {
              props.setFinishRidePanel(false)
            }}
            className="text-center text-3xl text-gray-500 mb-2"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h3>
    
          <h2 className="font-semibold text-2xl mb-6">Finish this ride to end</h2>
    
    {/* User Ride Reuest */}
          <div className="p-4 flex items-center justify-between rounded-xl
          border-2 border-amber-400 ">
            <div className="flex items-center gap-2 ">
              <h4 className="text-lg font-semibold capitalize">{props.rideData?.user.fullname.firstname + " " + props.rideData?.user.fullname.lastname}</h4>
            </div>
    
            <div className="text-center">
              <h3 className="text-xl font-medium">2.2 km</h3>
            </div>
          </div>
    
          <div className="flex flex-col gap-3">
            <div>
              
              <div className="flex items-center justify-center gap-6 w-full mt-3 border-b-2 border-gray-600 p-3">
                <i className="ri-map-pin-fill text-xl"></i>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Pick-up</h3>
                  <p className="font-semibold text-gray-600">
                    {props.rideData?.pickup}
                  </p>
                </div>
              </div>
    
              <div className="flex items-center justify-center gap-6 w-full mt-3 border-b-2 border-gray-600 p-3">
                <i className="ri-map-pin-2-line text-xl"></i>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Destination</h3>
                  <p className="font-semibold text-gray-600">
                    {props.rideData?.destination}
                  </p>
                </div>
              </div>
    
              <div className="flex items-center justify-center gap-6 w-full mt-3 p-3">
                <i className="ri-money-dollar-box-line text-xl"></i>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">₹{props.rideData?.fare}</h3>
                  <p className="font-semibold text-gray-600">Cash Cash</p>
                </div>
              </div>
            </div>
    
            <button 
              onClick={rideCompleted}
              className="bg-green-600 text-lg flex justify-center py-3 w-full rounded-lg text-white font-semibold "
            >
              Finish Ride
            </button>

          </div>
        </div>
  )
}

export default FinishRide
