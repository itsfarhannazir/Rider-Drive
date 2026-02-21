import { userModel } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import { blackListToken } from "../models/blackListToken.model.js";

const registerUser = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname , email, password } = req.body;

    const userAlreadyExist = await userModel.findOne({email});
  
    if (userAlreadyExist) {
      return res.status(400).json({ message: "User already exist"});
    }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await createUser({
    firstname : fullname.firstname,
    lastname : fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  return res.status(201).json({ token, user });
};


const loginUser = async (req , res , next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email , password} = req.body;
  
    const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
   return res.status(401).json({mesaage : "Invalid email or password"});
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) { 
    return res.status(401).json({mesaage : "Invalid email or password"});
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.status(201).json({token , user});
}

const getUserProfile = async(req, res , next) => {
  res.status(201).json(req.user);
}

const logoutUser = async (req , res , next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (token) {
      const exists = await blackListToken.findOne({ token });
      if (!exists) {
        await blackListToken.create({ token });
      }
  }

  res.clearCookie('token');

  res.status(201).json({message : "Logged out"});
}


export { 
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser
};
