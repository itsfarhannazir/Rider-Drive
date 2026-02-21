import { useRef, useState } from "react";
import mapImage from "../../public/map_Image.gif";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";
import Logo from "../../public/logo.png";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRidePanel from "../components/ConfirmRidePanel";
import LookingForDriverPanel from "../components/LookingForDriverPanel";
import WaitingForDriverPanel from "../components/WaitingForDriverPanel";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import { socketDataContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { distanceTimeDataContext } from "../context/DistanceTimeContext ";

const Home = () => {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [loading, setLoading] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const[vehicleType  , setvehicleType] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [ride, setRide] = useState(null);
  const [confirmRideData , setconfirmRideData] = useState(null);
  const [confirmedRideData , setConfirmedRideData] = useState(null);
  

  const panelOpenRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const {user} = useContext(userDataContext);
  const {socket} = useContext(socketDataContext);
  const {setDistanceTime} = useContext(distanceTimeDataContext);

  const navigate = useNavigate();

  useEffect(()=>{ 
    socket.emit("join" , {userType : "user" , userId : user._id})
  } , [user])

  socket.on("confirm-ride" , async (data) => {
    setconfirmRideData(data);
    setLookingForDriverPanel(false);
    setWaitingForDriverPanel(true);
  })

  socket.on("ride-confirmed" , async (data) => {
    setWaitingForDriverPanel(false);
    navigate("/riding" , {state : {ride : confirmRideData , vehicleType : vehicleType}})
    setConfirmedRideData(data);
  })

  // for location open panel
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelOpenRef.current, {
        height: "70%",
        padding: "22px",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelOpenRef.current, {
        height: "0%",
        padding: "0",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  // for vehicle Panle
  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);

  // for confirm vehicle panel
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0%)",
        bottom: 0,
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  // looking for the driver panel
  useGSAP(() => {
    if (lookingForDriverPanel) {
      gsap.to(lookingForDriverRef.current, {
        transform: "translateY(0%)",
        bottom: 0,
      });
    } else {
      gsap.to(lookingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [lookingForDriverPanel]);

  // Waiting for the driver
  useGSAP(() => {
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0%)",
        bottom: 0,
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriverPanel]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const fetchSuggestions = async (input) => {
    if (!input) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: {
            input: input,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setSuggestions(res.data);
    } catch (error) {
      console.log("AXIOS ERROR", error.message);
    }
  };

  const fetchFare = async (pickUp, destination) => {
    setLoading(true);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: {
            pickup: pickUp,
            destination: destination,
          },
        },
      );

      setFare(res.data);
      setPanelOpen(false);
      setVehiclePanel(true);
    } catch (error) {
      console.log("Axios Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const createRide = async () => {
    setLoading(true);

    try {

      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create` , {
        pickup : pickUp,
        destination,
        vehicletype : vehicleType 
      } , {
        headers : {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
          
      setRide(res.data);
      
    } catch (error) {
        console.log("Axios Error", error.message);
    }finally{
      setLoading(false)
    }
  }

  const getDistancetime = async () => {

  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-distance-time` , {
    params : {
      origin : pickUp,
      destination : destination, 
    } , 
    headers : {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  })

  console.log(res.data);
    setDistanceTime({
    distance: Math.round(res.data.distance / 1000), // in km
    duration: res.data.duration,
  });
  } 

  return (
    <>
      <div className="h-screen relative overflow-hidden">
        <img className="w-25 mt-3 absolute" src={Logo} />

        {/* map img  */}
        <div className="h-screen w-screen">
          <img
            className="w-full h-full object-cover"
            src={mapImage}
            alt="map Image"
          />
        </div>

        {/* Find a trip Panel  */}
        <div className="h-screen flex flex-col justify-end top-0 absolute w-full rounded-2xl">
          <div className="h-[30%] bg-white p-5 relative">
            <h4
              onClick={() => {
                setPanelOpen(false);
              }}
              ref={panelCloseRef}
              className="font-semibold text-gray-600 text-3xl absolute right-5 top-4 opacity-0"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h4>

            <h4 className="text-2xl font-semibold">Find a trip</h4>

            <form onSubmit={handleFormSubmit}>
              {/* <div className="line h-20 w-1 absolute top-[36%] left-9 rounded bg-gray-800"></div> */}

              <input
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                value={pickUp}
                onChange={(e) => {
                  setPickUp(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
                className="bg-[#eee] px-12 py-3 w-full rounded text-lg mt-4"
                type="text"
                placeholder="Add a pick-up location"
              />
              <input
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
                className="bg-[#eee] px-12 py-3 w-full rounded text-lg mt-3"
                type="text"
                placeholder="Enter  your destination"
              />
            </form>

            <button
              onClick={() => fetchFare(pickUp, destination)}
              disabled={loading}
              className={`w-full p-2 rounded mt-4 text-white ${
                loading ? "bg-gray-400" : "bg-black"
              }`}
            >
              {loading ? "Calculating fare..." : "Find trip"}
            </button>
          </div>
          <div ref={panelOpenRef} className="h-[0%] bg-white">
            <LocationSearchPanel
              activeField={activeField}
              setPickUp={setPickUp}
              setDestination={setDestination}
              suggestions={suggestions}
            />
          </div>
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full bg-white translate-y-full z-10 bottom-0 px-6 pt-2 pb-5  rounded-2xl"
      >
        <VehiclePanel
          fare={fare}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          setvehicleType = {setvehicleType}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full bg-white translate-y-full z-10  px-6 pt-2 pb-5  rounded-2xl"
      >
        <ConfirmRidePanel
          getDistancetime = {getDistancetime}
          createRide = {createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setLookingForDriverPanel={setLookingForDriverPanel}
          fare = {fare}
          vehicleType = {vehicleType}
          pickUp = {pickUp}
          destination = {destination}
          loading = {loading}
        />
      </div>

      <div
        ref={lookingForDriverRef}
        className="fixed w-full bg-white translate-y-full z-10  px-6 pt-2 pb-5  rounded-2xl"
      >
        <LookingForDriverPanel
          setLookingForDriverPanel={setLookingForDriverPanel}
          pickUp = {pickUp}
          destination = {destination}
          fare = {fare}
          vehicleType = {vehicleType}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full bg-white z-10 translate-y-full  px-6 pt-2 pb-5  rounded-2xl"
      >
        <WaitingForDriverPanel
        vehicleType = {vehicleType}
          confirmRideData = {confirmRideData}
          setWaitingForDriverPanel={setWaitingForDriverPanel}
        />
      </div>
    </>
  );
};

export default Home;
