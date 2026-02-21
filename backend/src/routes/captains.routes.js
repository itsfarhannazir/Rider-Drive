import { Router } from "express";
import { body } from "express-validator";
import { registerCaptain ,loginCaptain , getCaptainProfile ,logoutCaptain } from "../controllers/captains.controller.js";
import { authcaptain } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register" , [
  body("email").isEmail().withMessage("Invalid Email"),
  body("fullname.firstname").isLength({min : 3}).withMessage("First name must be at least 3 characters long"),
  body("password").isLength({min:8}).withMessage("Password must be at least 8 characters long"),
  body("vehicle.color").isLength({ min: 3 }).withMessage("Color must have at least 3 characters"),
  body("vehicle.plate").isLength({ min: 3 }).withMessage("Plate must have at least 3 characters"),
  body("vehicle.capacity").isInt({ min: 1 }).withMessage("Vehicle must have at least 1 capacity"),
] , registerCaptain);

router.post("/login" ,
  loginCaptain)

router.get("/profile" , authcaptain , getCaptainProfile )

router.get("/logout" , logoutCaptain)




export default router;