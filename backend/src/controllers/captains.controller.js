import { captainModel } from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { createCaptain } from "../services/captains.service.js";
import { blackListToken } from "../models/blackListToken.model.js";


const registerCaptain = async (req , res , next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }

  const {fullname , email, password , vehicle} = req.body;  

  const captainAlreadyExist = await captainModel.findOne({email});

  if (captainAlreadyExist) {
    return res.status(400).json({ message: "Captain already exist"});
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await createCaptain({
    firstname : fullname.firstname,
    lastname : fullname.lastname,
    email,
    password : hashedPassword,
    plate : vehicle.plate,
    capacity : vehicle.capacity,
    color : vehicle.color,
    vehicleType : vehicle.vehicleType,
  })

  const token = await captain.generateAuthToken();

  res.status(201).json({
    token,
    captain
  })

}

const loginCaptain = async (req , res , next) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }

  const {email , password} = req.body;

  const captain = await captainModel.findOne({email}).select("+password");

  if (!captain) {
   return res.status(401).json({mesaage : "Invalid email or password"});
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({mesaage : "Invalid email or password"});
  }

  const token = await captain.generateAuthToken();

  res.cookie("token", token);

  res.status(201).json({
    token , captain
  })

}

const getCaptainProfile = async(req ,res , next) => {  // using middleware before it 
 return res.status(201).json({captain : req.captain});
}

const logoutCaptain = async (req , res , next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (token) {
      const exists = await blackListToken.findOne({ token });
      if (!exists) {
        await blackListToken.create({ token });
      }
  }

  res.clearCookie('token');

 return res.status(201).json({message : "Captain Logged out"});
}

export {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain
};