import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const captainSchema = new Schema({
  fullname : {
    firstname : {
      type : String,
      required : true,
      minLength : [3 , 'First name must be at least 3 characters long']
    },
    lastname : {
      type : String,
      minLength : [3 , 'Last name must be at least 3 characters long']
    }
  },
  email : {
      type : String,
      required : true,
      unique: true,
      minLength : [5 , 'email must be at least 5 characters long']
  },
  password : {
    type:String,
    required:true,
    minLength : [8 , 'Password must be at least 8 characters long'],
    select : false,
  },
  socketId : {
    type:String,
  },
  location : {
    lat: {
      type : Number,
    },
    lng :{
       type : Number,
    }
  },
  status :{
    type : String,
    enum : ["active" , "inactive"],
    default : "inactive",
  },
  vehicle : {
    plate : {
      type : String,
      required : true,
      minLength : [3 , "Vehicle plate must be 3 character long"],
    },
    capacity : {
      type : Number,
      minLength : [1 , "Vehicle capapcity must be greater than 1"]
    },
    color : {
      type : String,
      required : true,
      minLength : [2 , "Vehicle plate must be 2 character long"],
    },
    vehicleType : {
      type : String,
      required : true,
      enum : ["Car" , "Moto" , "Auto"],
    }
  }
})

captainSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({_id : this._id} , process.env.JWT_SECRET , {expiresIn : '24h'})

  return token;
}

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password , 10);
}

captainSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword , this.password)
}

export const captainModel = mongoose.model("captain" , captainSchema);
