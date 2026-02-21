import { captainDataConetxt } from "../context/CaptainContext";
import { useContext } from "react";

const CaptainDetails = () => {

  const {captain} = useContext(captainDataConetxt)
  
  return (
    <div className="p-5">
          <div className=" p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
              <h4 className="text-xl font-semibold capitalize">{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
          </div>

          <div className="text-center">
            <p className='font-medium text-lg'>Plate : <span className='text-gray-600'>{captain.vehicle.plate}</span></p>
            <p className='font-medium text-lg'>Color : <span className='text-gray-600'>{captain.vehicle.color}</span></p>
          </div>

        </div>

        <div className="flex justify-evenly items-center bg-gray-100 p-4 rounded mt-2">

          <div className="text-center ">
            <i className=" text-xl font-semibold ri-time-line"></i>
            <h2 className="text-lg font-semibold">10.2</h2>
            <h3 className="text-sm font-medium text-gray-600">Hours Online</h3>
          </div>

          <div className="text-center">
            <i className=" text-xl font-semibold ri-dashboard-3-line"></i>
            <h2 className="text-lg font-semibold">10.2</h2>
            <h3  className="text-sm font-medium text-gray-600">Hours Online</h3>
          </div>

          <div className="text-center">
            <i className=" text-xl font-semibold ri-booklet-line"></i>
            <h2 className="text-lg font-semibold">10.2</h2>
            <h3  className="text-sm font-medium text-gray-600">Hours Online</h3>
          </div>

        </div>
        </div>
  )
}

export default CaptainDetails
