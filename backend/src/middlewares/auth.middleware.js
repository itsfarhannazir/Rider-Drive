import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { blackListToken } from "../models/blackListToken.model.js";
import { captainModel } from "../models/captain.model.js";

const authUser = async (req, res, next) => {
  
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blackListToken.findOne({ token });

  if (isBlacklisted) {
  return res.status(401).json({ message: "Token is blacklisted , Unauthorized" });
  }

  try {

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decodedToken._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" }); 
    }

    req.user = user;

    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};


const authcaptain = async(req , res , next) => {

  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
     res.status(401).json({ message: "token Unauthorized" });
  }

  const isBlacklisted = await blackListToken.findOne({token});

  if (isBlacklisted) {
    res.status(401).json({ message: "Token is blacklisted" });
  }

  try {

    const decodedToken =  jwt.verify(token, process.env.JWT_SECRET);

    const captain = await captainModel.findById(decodedToken._id).select("-password");

    if (!captain) {
      return res.status(401).json({ message: "Captain not found" }); 
    }

    req.captain = captain

    return next();
    
  } catch (error) {
      res.status(401).json({ message: "total Unauthorized" });
  }


}


export {authUser , authcaptain};
