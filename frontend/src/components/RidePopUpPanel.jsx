import driver from "../../public/driver.jpg";

const RidePopUpPanel = (props) => {

  return (
    <div className="w-full">
      <h3
        onClick={() => {
          props.setRidePopUpPanel(false)
        }}
        className="text-center text-3xl text-gray-500 mb-2"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h3>

      <h2 className="font-semibold text-2xl mb-4">New Ride Available</h2>

{/* User Ride Reuest */}
      <div className="p-4 flex items-center justify-between border-2 rounded-xl border-amber-400 ">
        <div className="flex items-center gap-2 ">
          <h4 className="text-lg font-semibold capitalize">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h4>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-medium">{props.ride?.distance} km</h3>
        </div>
      </div>

      <div className="flex flex-col   gap-3">
        <div>
          
          <div className="flex items-center justify-center gap-6 w-full mt-3 border-b-2 border-gray-600 p-3">
            <i className="ri-map-pin-fill text-xl"></i>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Pick-Up</h3>
              <p className="font-semibold text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 w-full mt-3 border-b-2 border-gray-600 p-3">
            <i className="ri-map-pin-2-line text-xl"></i>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Destination</h3>
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

        <div className="flex items-center justify-between w-full p-3">

        <button
          onClick={() => {
            props.setRidePopUpPanel(false)
          }}
          className="bg-red-600 p-2 rounded-lg px-10 py-2.5 text-white font-semibold "
        >
          Ignore
        </button>

          <button
          onClick={() => {
            props.setCofirmRidePopUpPanel(true)
            props.setRidePopUpPanel(false)
            props.confirmRide()
          }}
          className="bg-green-600 p-2 rounded-lg px-10 py-2.5 text-white font-semibold"
        >
          Accept
        </button>


        </div>

      </div>
    </div>
  );
};

export default RidePopUpPanel;
