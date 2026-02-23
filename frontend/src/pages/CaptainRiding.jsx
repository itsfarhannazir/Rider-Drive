import React, { useRef, useState } from "react";
import mapImage from "../../public/map_Image.gif";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CaptainRiding = () => {
  
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const finishRidePanelRef = useRef(null);

  const location = useLocation();

  const rideData = location.state?.ride;

  const handleArrived = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/captain-arrived`,
        { rideId: rideData._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setHasArrived(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen overflow-hidden relative">
      <img className="h-4/5 w-full" src={mapImage} alt="" />

      <div className="bg-white rounded-2xl w-full h-screen">
        <h3
          onClick={() => {
            setFinishRidePanel(true);
          }}
          className="text-center text-3xl mb-2 bg-gray-300"
        >
          <i className="ri-arrow-up-wide-line"></i>
        </h3>

        <div className="1/5 flex items-center justify-between p-3">
          <h4 className="text-lg font-medium">Ride Duration : {rideData?.duration} hours</h4>

          {!hasArrived ? (
            <button
              onClick={handleArrived}
              disabled={loading}
              className={`py-2 px-3 rounded text-white font-semibold text-lg bg-green-600 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Please wait..." : "I have arrived"}
            </button>
          ) : (
            <button
              onClick={()=>{
                setFinishRidePanel(true);
              }}
              className="py-2 px-3 rounded text-white font-semibold text-lg bg-blue-600"
            >
              Complete Ride
            </button>
          )}
        </div>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed w-full bg-white translate-y-full  z-10 bottom-0 px-6 pt-2 pb-5  rounded-2xl"
      >
        <FinishRide
          rideData={rideData}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
