import { captainModel } from "../models/captain.model.js";

const createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  plate,
  capacity,
  color,
  vehicleType
}) => {    

  if (!firstname || !email || !password || !plate || !capacity || !color || !vehicleType) {
    throw new Error ("All fields are required");
  }

  const captain = await captainModel.create({
    fullname : {
      firstname,
      lastname
    },
    email,
    password,
    vehicle : {
    color,
    capacity,
    plate,
    vehicleType
    }
  })

  return captain;
}

export {createCaptain};