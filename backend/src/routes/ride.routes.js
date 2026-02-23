import { Router } from "express";
import { authcaptain, authUser } from "../middlewares/auth.middleware.js";
import { body , query } from "express-validator";
import { createRideController , getFareController , confirmRideController , startRideController , captainArrivedController , rideCompletedController } from "../controllers/rides.controller.js";

const router = Router();

router.post("/create" ,
   authUser ,
    [
body("pickup").isString().isLength({min : 3}).withMessage("Invalid Pickup address"),
body("destination").isString().isLength({min : 3}).withMessage("Invalid destination address"),
body("vehicletype").isString().isIn(["Auto" , "Car" , "Moto"]).withMessage("At least one vahicle is selected"),
],
createRideController
)

router.get("/get-fare" , 
[
query("pickup").isString().isLength({min : 3 , max : 30}),
query("destination").isString().isLength({min : 3 , max : 30})
] , 
getFareController
)

router.post( "/confirm-ride",
  authcaptain,
  [body("rideId").notEmpty().withMessage("rideId is required").isMongoId().withMessage("Invalid rideId format")],
  confirmRideController
);

router.get("/start-ride" ,
  authcaptain,
  [
    query("rideId").notEmpty().withMessage("rideId is required").isMongoId().withMessage("Invalid rideId format"),
  ],
  startRideController
)

router.post("/captain-arrived" ,
   authcaptain ,
  [
    body("rideId").notEmpty().withMessage("rideId is required").isMongoId().withMessage("Invalid rideId format"),
  ],
  captainArrivedController 
 )

 router.post("/ride-completed" , 
  authcaptain,
  [
   body("rideId").notEmpty().withMessage("rideId is required").isMongoId().withMessage("Invalid rideId format"),
  ],
  rideCompletedController
 )



export default router;