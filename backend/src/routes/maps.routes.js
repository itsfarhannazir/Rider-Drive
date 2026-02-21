import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { getCoordinates , getDistanceTime , getSuggestionsController} from "../controllers/maps.controller.js";
import { query } from "express-validator";

const router = Router();


router.get("/get-coordinates" ,
  query('address').trim().isString().isLength({min : 3}).withMessage("Address must be at least 3 characters long")
  , authUser , getCoordinates)

router.get("/get-distance-time" , 
  [
    query("origin").trim().isString().isLength({min : 3}).withMessage("Origin must be at least 3 characters long"),
  query("destination").trim().isString().isLength({min : 3}).withMessage("Destination must be at least 3 characters long")
  ],
  authUser,
  getDistanceTime
)

router.get("/get-suggestions" , 
  query("input").trim().isString().withMessage("Origin must be at least 3 characters long"),
  authUser,
  getSuggestionsController
)


export default router;

