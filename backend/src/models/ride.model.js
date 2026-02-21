import mongoose, { Schema } from "mongoose";

const rideSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  captain: {
     type: mongoose.Schema.Types.ObjectId,
    ref: 'captain',
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  vehicletype : {
    type : String,
    enum : ["auto" , "car" , "moto"]
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },
  duration: {
    type: Number
  },
  distance: {
    type: Number
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
})

export const rideModel = mongoose.model("ride" , rideSchema);