import mongoose , {Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const userSchema = new Schema({
  fullname : {
    firstname : {
      type : String,
      required : true,
      minLength : [3 , 'First name must be at least 3 characters long']
    },
    lastname : {
      type : String,
      // minLength : [3 , 'Last name must be at least 3 characters long']
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
  }
})

// Genarate jwt auth token 
userSchema.methods.generateAuthToken  = function() {
const token = jwt.sign({_id : this._id} , process.env.JWT_SECRET , {expiresIn : '24h'});

return token;
}

// hashing password
userSchema.statics.hashPassword = async function(password){
  return await bcrypt.hash(password , 10);
}

// comapre Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


export const userModel = mongoose.model('user' , userSchema);