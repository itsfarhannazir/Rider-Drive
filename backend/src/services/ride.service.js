import { rideModel } from "../models/ride.model.js";
import { fetchDistanceTime, fetchgetCoordinates } from "./maps.service.js";

const getFare = async (pickup, destination) => {

  if (!pickup || !destination) {
    throw new Error("Pickup and destination is required");
  }
  
  const pickupCoordinates = await fetchgetCoordinates(pickup);
  const destinationCoordinates = await fetchgetCoordinates(destination);

  const distanceTime = await fetchDistanceTime(pickupCoordinates, destinationCoordinates);

  const distanceKm = distanceTime.distance / 1000 ; 
  const durationTime = distanceTime.duration / 60 ;
  
  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const fare = {
    auto: Math.round (baseFare.auto + distanceKm * perKmRate.auto + durationTime * perMinuteRate.auto),
    car: Math.round(baseFare.car + distanceKm * perKmRate.car + durationTime * perMinuteRate.car),
    moto: Math.round(baseFare.moto + distanceKm * perKmRate.moto + durationTime * perMinuteRate.moto) ,
    distance: distanceKm.toFixed(2),
    duration : (durationTime/60).toFixed(2)
  };

  return fare;
};

const createRide = async ({user , pickup , destination , vehicletype}) => {

  if (!user || !pickup || !destination || !vehicletype) {
    throw new Error("All fields are required")
  }

  const fare = await getFare(pickup , destination)

  console.log("Total distance" , fare.distance);
  
  
  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    vehicletype,
    fare : fare[vehicletype],
    distance : fare.distance,
    duration : fare.duration,
  })

  return ride;

}

const confirmRide = async ({rideId , captain}) => {
      if (!rideId || !captain) {
        throw new Error("RideId is required to create the ride");
      } 

      const ride = await rideModel.findOneAndUpdate({ _id: rideId } , {
        status : "accepted",
        captain : captain,
      } ,  { new: true }).populate("user").populate("captain").select("+otp");

      if (!ride) {
        throw new Error("Ride not found");
      }

      return ride;
}

const startRide = async ({rideId , captain}) => {
  
  if (!rideId || !captain ) {
    throw new Error("RideId is required to start ride");
  }

  const ride = await rideModel.findOneAndUpdate({_id : rideId} , {
    status : "ongoing",
    captain : captain,
  }).populate("user").populate("captain")

  if (!ride) {
    throw new Error("Ride not started");
  }

  return ride
}

const captainArrived = async ({rideId , captain }) => {
  if (!rideId) {
    throw new Error("RideId is required");
  }

  const ride = await rideModel.findOneAndUpdate({_id : rideId} , {
    captain : captain._id
  }).populate("user").populate("captain")

  if (!ride) {
    throw new Error("Ride not started");
  }

  return ride
}

const rideCompleted = async ({rideId , captain}) => {
  
  if (!rideId) {
    throw new Error("RideId is required to complete ride");
  }

  const ride = await rideModel.findOneAndUpdate({_id : rideId} , {
    status : "completed",
    captain : captain._id,
  }).populate("user").populate("captain")

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride ;

} 

export {
  createRide,
  getFare,
  confirmRide,
  startRide,
  captainArrived,
  rideCompleted
};
