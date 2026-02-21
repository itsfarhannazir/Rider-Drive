import { validationResult } from "express-validator"
import { captainArrived, confirmRide, createRide , getFare, startRide } from "../services/ride.service.js";
import { fetchgetCoordinates } from "../services/maps.service.js";
import { getCaptainInTheRadius } from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import { rideModel } from "../models/ride.model.js";
import { rideCompleted } from "../services/ride.service.js";

const createRideController = async (req , res , next) => {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {pickup , destination , vehicletype} = req.body;

  try {
    const ride  = await createRide({
      user : req.user._id,
      pickup : pickup,
      destination : destination,
      vehicletype : vehicletype
    })

    res.status(201).json(ride);

    const pickUpCoordinates = await fetchgetCoordinates(pickup);
    
    const captains = await getCaptainInTheRadius(pickUpCoordinates.lat , pickUpCoordinates.lng , 50)

    ride.otp = "" // before sending to the captain

    const rideWithUser = await rideModel.findById(ride._id).populate("user");

    captains.map((captain) => {
      sendMessageToSocketId(captain.socketId , {
        event : "new-ride",
        data : rideWithUser
      })
    })
    
  } catch (error) {
    return res.status(401).json({message : "Error in creating Ride"})
  }

}

const getFareController = async (req , res , next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {pickup , destination} = req.query;

  try {
    const totalFare = await getFare(pickup , destination);  
  
    res.status(201).json(totalFare)
  } catch (error) {
    throw new Error("Error in calculating fare")
  }

}

const confirmRideController = async (req , res , next) => {

  try {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }
  
    const {rideId} = req.body;
  
    const ride = await confirmRide({rideId , captain: req.captain});
  
    res.status(201).json(ride); 
  
    sendMessageToSocketId(ride.user.socketId , {
      event : "confirm-ride",
      data : ride
    })

  } catch (error) {
     return res.status(401).json({message : "Error in Confirming Ride"})
  }

}

const startRideController = async (req ,res) => {

  try {
     const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }

    const {rideId } = req.query;

    const ride = await startRide({rideId , captain : req.captain})

    res.status(200).json(ride);

    sendMessageToSocketId(ride.user.socketId , {
      event : "ride-confirmed",
      data : ride,
    })

  } catch (error) {
     return res.status(401).json({message : "Error in Starting Ride"})
  }
}

const captainArrivedController = async (req , res) => {
  try {

     const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }

    const {rideId } = req.body;

    const ride = await captainArrived({rideId , captain : req.captain})

    res.status(200).json({ride  , message : "Captain is arrived"})

    sendMessageToSocketId(ride.user.socketId , {
      event : "captain-arrived",
      data : ride  // optional this time
    })
    
  } catch (error) {
       return res.status(401).json(error.message)
  }
}

const rideCompletedController = async (req , res) => {
  
     const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }

    const {rideId} = req.body;

    console.log(rideId);
    

    const ride = await rideCompleted({rideId , captain : req.captain})

    res.status(200).json({ride , message : "Ride is completed"})

    sendMessageToSocketId(ride.user.socketId , {
      event : "ride-completed",
      data : ride  // optional this time
    })
}

export {
  createRideController,
  getFareController,
  confirmRideController,
  startRideController,
  captainArrivedController,
  rideCompletedController
}