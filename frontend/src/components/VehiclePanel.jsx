import car from "../../public/uber_car.jpg";
import moto from "../../public/uber_moto.jpg";
import auto from "../../public/uber_auto.jpg";

const VehiclePanel = (props) => {
  
  return (
    <div className="pb-3">

      <h3
        onClick={() => {
          props.setVehiclePanel(false)
        }}
        className="text-center text-3xl text-gray-500 mb-3"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h3>

      <h2 className="font-semibold text-2xl mb-9">Choose a ride</h2>

      <div
        onClick={()=>{
          props.setVehiclePanel(false)
          props.setConfirmRidePanel(true);
          props.setvehicleType("Car")
        }}
        className="w-full flex items-center justify-between mb-3 px-3.5 border border-gray-300 active:border-black rounded-xl py-1 mt-4"
      >
        <img className="h-11" src={car} alt="" />
        <div className="flex-1 ml-5">
          <h3 className="font-semibold text-lg">
            UberGO{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h3>
          <h4 className="font-semibold text-sm">2 mints away</h4>
          <p className="text-gray-700 text-sm">Affordable, compact rides</p>
        </div>
        <h3 className="text-lg font-semibold">₹{props.fare.Car}</h3>
      </div>

      <div
       onClick={()=>{
          props.setVehiclePanel(false)
          props.setConfirmRidePanel(true);
          props.setvehicleType("Moto")
        }}
        className=" w-full flex items-center justify-between border border-gray-300 mb-3 p-3.5 active:border-black rounded-xl py-1 mt-4"
      >
        <img className="h-12" src={moto} alt="" />
        <div className="flex-1 ml-5">
          <h3 className="font-semibold text-lg">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h3>
          <h4 className="font-semibold text-sm">3 mints away</h4>
          <p className="text-gray-700 text-sm">Affordable, moto rides</p>
        </div>
        <h3 className="text-lg font-semibold">₹{props.fare.Moto}</h3>
      </div>

      <div
       onClick={()=>{
          props.setVehiclePanel(false)
          props.setConfirmRidePanel(true);
          props.setvehicleType("Auto")
        }}
        className=" w-full flex items-center justify-between border border-gray-300  mb-3 p-3.5 active:border-black rounded-xl py-1 mt-4"
      >
        <img className="h-12" src={auto} alt="" />
        <div className="flex-1 ml-5">
          <h3 className="font-semibold text-lg">
            Auto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h3>
          <h4 className="font-semibold text-sm">5 mints away</h4>
          <p className="text-gray-700 text-sm">Affordable, rikshaw rides</p>
        </div>
        <h3 className="text-lg font-semibold">₹{props.fare.Auto}</h3>
      </div>

    </div>
  );
};

export default VehiclePanel;
