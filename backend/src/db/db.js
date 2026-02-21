import mongoose from "mongoose";

const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Mongodb Connected sucessfully");
    
  } catch (error) {
    console.log(`❌ Database connection failed ${error}`);
  }
}

export default connectDB;