import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';


const app = express();

app.use(cors());
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))

connectDB();   // database connection

// import routes 
import userRoutes from './routes/user.routes.js';
import captainRoutes from "./routes/captains.routes.js";
import mapRoutes from "./routes/maps.routes.js";
import rideRoutes from "./routes/ride.routes.js";


//Router Declarearion
app.use("/users" , userRoutes)
app.use("/captains" , captainRoutes)
app.use("/maps" , mapRoutes);
app.use("/rides" , rideRoutes);


export {app};