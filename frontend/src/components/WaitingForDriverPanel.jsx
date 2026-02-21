import car from "../../public/uber_car.jpg";
import moto from "../../public/uber_moto.jpg";
import auto from "../../public/uber_auto.jpg";

const WaitingForDriver = (props) => {

   const vehicleImages = {
        car : car,
        moto : moto,
        auto : auto
      }

  return (
    <div className="w-full">
      <h3
        onClick={() => {
          props.setWaitingForDriverPanel(false);
        }}
        className="text-center text-3xl text-gray-500 mb-2"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h3>

      <h2 className="font-semibold text-2xl mb-9">Waiting for a Driver to confirm</h2>

      <div className="flex items-center justify-between">
        <img className="w-25" src={vehicleImages[`${props.vehicleType}`]} alt="" />

        <div className="text-right">
          <h2 className="text-lg font-semibold capitalize">{props.confirmRideData?.captain.fullname.firstname + " " + props.confirmRideData?.captain.fullname.lastname}</h2>
          <h2 className="text-xl font-semibold">{props.confirmRideData?.captain.vehicle.plate}</h2>
          <p className="font-semibold text-gray-600">Vehicle color : {props.confirmRideData?.captain.vehicle.color}</p>
        </div>
      </div>

      <div className="flex flex-col p-2 gap-3">
        <div>
          <div className="flex items-center justify-center gap-6 w-full mt-3 border-b-2 border-gray-600 p-3">
            <i className="ri-map-pin-fill text-xl"></i>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Pick-up</h3>
              <p className="font-semibold text-gray-600">
                {props.confirmRideData?.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 w-full mt-3 border-b-2 border-gray-600 p-3">
            <i className="ri-map-pin-2-line text-xl"></i>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Destination</h3>
              <p className="font-semibold text-gray-600">
               {props.confirmRideData?.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 w-full mt-3 p-3">
            <i className="ri-money-dollar-box-line text-xl"></i>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">₹{props.confirmRideData?.fare}</h3>
              <p className="font-semibold text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
