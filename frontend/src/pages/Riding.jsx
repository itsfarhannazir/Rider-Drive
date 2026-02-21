import { Link } from "react-router-dom";
import mapImage from "../../public/map_Image.gif";
import car from "../../public/uber_car.jpg";
import moto from "../../public/uber_moto.jpg";
import auto from "../../public/uber_auto.jpg";
import { useLocation } from "react-router-dom";
import DriverArrived from "../components/DriverArrived";
import { useContext, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { socketDataContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

const Riding = () => {

  const location = useLocation();
  
  const rideData = location.state?.ride;
  const vehicleType = location.state?.vehicleType;
  
  const [driverArrivedPanel , setDriverArrivedPanel ] = useState(false);
  const driverArrivedRef = useRef(null);

  const {socket} = useContext(socketDataContext);
  const navigate = useNavigate();

   const vehicleImages = {
          car : car,
          moto : moto,
          auto : auto
        }


  useGSAP(() => {
    if (driverArrivedPanel) {
      gsap.to(driverArrivedRef.current, {
        transform: "translateY(0%)",
        bottom : 0,
      });
    } else {
      gsap.to(driverArrivedRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [driverArrivedPanel]);

socket.on("captain-arrived" , (data) => {
  setDriverArrivedPanel(true);
})

socket.on("ride-completed" , (data) => {
  console.log("ride-completed" , data);

  navigate("/home")
})

  return (
    <>
      <div className="h-screen overflow-hidden relative">

        <Link to="/home">
        <h5 className="w-12 h-12 absolute bg-white flex items-center justify-center rounded-full top-2 right-3"><i className=" font-medium text-2xl ri-home-8-line"></i></h5>
        </Link>
        
        <img className="h-[60%] w-full" src={mapImage} alt="" />

        <div className="w-full px-5 mt-2 rounded-xl">
          <div className="flex items-center justify-between">
            <img className="w-25" src={vehicleImages[`${vehicleType}`]} alt="" />

            <div className="text-right">
              <h2 className="text-lg font-semibold capitalize">{rideData?.captain.fullname.firstname + " " + rideData?.captain.fullname.lastname}</h2>
              <h2 className="text-xl font-semibold">{rideData?.captain.vehicle.plate}</h2>
              <p className="font-semibold text-gray-600">Vehicle Color : {rideData?.captain.vehicle.color}</p>
            </div>
          </div>

          <div className="flex flex-col p-2 gap-3">
            <div>
              <div className="flex items-center justify-center gap-6 w-full mt-2 border-b-2 border-gray-600 p-3">
                <i className="ri-map-pin-2-line text-xl"></i>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Destination</h3>
                  <p className="font-semibold text-gray-600">
                    {rideData?.destination}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 w-full mt-2 p-3">
                <i className="ri-money-dollar-box-line text-xl"></i>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">₹{rideData?.fare}</h3>
                  <p className="font-semibold text-gray-600">Cash Cash</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div
        ref={driverArrivedRef}
        className="fixed w-full bg-white z-10 translate-y-full px-6 pt-2 pb-5  rounded-2xl"
      >
       <DriverArrived 
       rideData = {rideData}
       setDriverArrivedPanel = {setDriverArrivedPanel}
       />
      </div>

      </div>
    </>
  );
};

export default Riding;
