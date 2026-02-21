import React from 'react'

const DriverArrived = (props) => {
  return (
    <>
      <div className="w-full">
        <h3
          onClick={() => {
            props.setDriverArrivedPanel(false);
          }}
          className="text-center text-3xl text-gray-500 mb-2"
        >
          <i className="ri-arrow-down-wide-line"></i>
        </h3>
      </div>

      <div className="flex items-center justify-between w-full mb-5">
      <h2 className="font-semibold text-2xl">Driver arrived</h2>
        <div>
        <p className="text-lg font-semibold capitalize">Captain : <span className='text-gray-600'>{props.rideData?.captain.fullname.firstname + " " + props.rideData?.captain.fullname.lastname}</span> </p>
          <p className="text-lg font-semibold">Vehicle Plate : <span className='text-gray-600'>{props.rideData?.captain.vehicle.plate}</span> </p>
        </div>
      </div>

      <button
        onClick={() => {
          props.setDriverArrivedPanel(false);
        }}
        className="bg-green-600 rounded py-2 px-3 text-white w-full text-center text-lg font-semibold mt-10"
      >
        Ok , I'm coming
      </button>
    </>
  );
}

export default DriverArrived
