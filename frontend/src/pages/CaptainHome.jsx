import { Link } from "react-router-dom";
import mapImage from "../../public/map_Image.gif";
import Logo from "../../public/logo.png";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUpPanel from "../components/RidePopUpPanel";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopupPanel from "../components/ConfirmRidePopupPanel";
import {socketDataContext} from "../context/SocketContext";
import { useContext } from "react";
import { captainDataConetxt } from "../context/CaptainContext";
import { useEffect } from "react";
import axios from "axios";


const CaptainHome = () => {

  const [ridePopUpPanel , setRidePopUpPanel] = useState(false);
  const [CofirmRidePopUpPanel , setCofirmRidePopUpPanel] = useState(false);
  const [ride , setRide] = useState(null);

  const ridePopUpPanelRef = useRef(null)
  const CofirmRidePopUpPanelRef = useRef(null)

  const {socket} = useContext(socketDataContext);
  const {captain} = useContext(captainDataConetxt);
  

  useEffect(() => { 
    socket.emit("join" , {userType : "captain" , userId : captain._id})
    
      const sendLocation = () => {

      if (!navigator.geolocation) {
        console.log("Geolocation not supported");
        return;
      }

       navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
         socket.emit("update-location-captain", {
            userId : captain._id,
            location : {
              lat : latitude,
              lng : longitude,
            }
          });
        },
        (err) => console.log("Error getting location:", err)
      );
    };

    sendLocation();

    const interval = setInterval(() => {
      sendLocation();
    }, 10000); // 10 sec

    return () => clearInterval(interval);

  } , [captain])

 socket.on("new-ride" , (data) => {
    setRide(data);
    setRidePopUpPanel(true);
  }) 

  const confirmRide = async () => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm-ride` , {
     rideId : ride._id,
    } , {
      headers : {
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(0%)",
        bottom: 0,
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (CofirmRidePopUpPanel) {
      gsap.to(CofirmRidePopUpPanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(CofirmRidePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [CofirmRidePopUpPanel]);

  return (
        <>
      <div className="h-screen overflow-hidden relative">

        <div className="absolute flex items-center justify-between w-full">

        <img className="w-25 mt-3" src={Logo} />

        <Link to="/captain-logout">
        <h5 className="w-12 h-12 bg-white flex items-center justify-center rounded-full mr-3"><i className=" font-medium text-2xl ri-logout-box-line"></i></h5>
        </Link>
        </div>
        
        <img className="h-3/5 w-full" src={mapImage} alt="" />

{/* Captain details compo  */}
        <div>
          <CaptainDetails />
        </div>

      </div>

{/* Ride PopUp */}
      <div
        ref={ridePopUpPanelRef}
        className="fixed w-full bg-white translate-y-full z-10  px-6 pt-2 pb-5  rounded-2xl"
         >
        <RidePopUpPanel  
        ride = {ride}
        confirmRide = {confirmRide}
        setRidePopUpPanel = {setRidePopUpPanel} 
        setCofirmRidePopUpPanel = {setCofirmRidePopUpPanel}
        />
      </div>

{/* Confirm Ride PopUp */}
      <div
        ref={CofirmRidePopUpPanelRef}
        className="fixed w-full h-screen bg-white translate-y-full z-10 bottom-0 px-6 pt-2 pb-5  rounded-2xl"
         >
        <ConfirmRidePopupPanel
        ride = {ride}
        setCofirmRidePopUpPanel = {setCofirmRidePopUpPanel}
        />
      </div>

        </>
  )
}

export default CaptainHome
