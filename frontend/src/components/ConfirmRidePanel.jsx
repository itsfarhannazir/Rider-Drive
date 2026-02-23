import car from "../../public/uber_car.jpg";
import moto from "../../public/uber_moto.jpg";
import auto from "../../public/uber_auto.jpg";

const ConfirmRidePanel = (props) => {

  const vehicleImages = {
    car : car,
    moto : moto,
    auto : auto
  }
  
  return (
    <div className="w-full">
      <h3
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
        className="text-center text-3xl text-gray-500 mb-2"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h3>

      <h2 className="font-semibold text-2xl mb-9">Confirm your ride</h2>

      <div className="flex flex-col p-2 gap-3">

        <div className="flex items-center justify-center">
          {props.vehicleType && (
            <img
              className="w-40"
              src={vehicleImages[`${props.vehicleType}`]}
              alt={"Vehicle Image"}
            />
          )}
        </div>

        <div>
          <div className="flex items-center justify-center gap-6 w-full mt-3 border-b-2 border-gray-600 p-3">
            <i className="ri-map-pin-fill text-xl"></i>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Pick-up</h3>
              <p className="font-semibold text-gray-600">{props.pickUp}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 w-full mt-3 border-b-2 border-gray-600 p-3">
            <i className="ri-map-pin-2-line text-xl"></i>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Destination</h3>
              <p className="font-semibold text-gray-600">{props.destination}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 w-full mt-3 p-3">
            <i className="ri-money-dollar-box-line text-xl"></i>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                ₹{props.fare[props.vehicleType]}
              </h3>
              <p className="font-semibold text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            props.createRide();
            props.setConfirmRidePanel(false);
            props.setLookingForDriverPanel(true);
          }}
          className={`p-2 w-full rounded-lg text-white font-semibold mt-3 ${props.loading? "bg-gray-400" : "bg-green-600 "}`}
        >
          {props.loading? "Creating Ride..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}

export default ConfirmRidePanel
