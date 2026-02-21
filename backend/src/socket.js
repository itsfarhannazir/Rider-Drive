import { Server } from "socket.io";
import { userModel } from "./models/user.model.js";
import { captainModel } from "./models/captain.model.js";

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User Connected:", socket.id);


  socket.on("join" , async (data) =>{

      const {userId , userType} = data ;

      console.log(`User ${userId} joined as ${userType}`);

      if (userType == "user") {
        await userModel.findByIdAndUpdate(userId , {
          socketId : socket.id
        })
      }else if(userType == "captain"){
        await captainModel.findByIdAndUpdate(userId , {
          socketId : socket.id
        })
      }

    })

  socket.on("update-location-captain" , async (data) => {
      const {userId , location} = data;

      if (!location.lat || !location.lng) {
        socket.emit("error" , {message : "Invalid location"})
      }

      await captainModel.findByIdAndUpdate(userId , {
        location : {
          lat : location.lat,
          lng : location.lng,
        }
      })
  })

    // When client disconnects
    socket.on("disconnect", () => {
      console.log("❌ User Disconnected:", socket.id);
    });
  });

  return io;
};


const sendMessageToSocketId = (socketId, messageObject) => {
  
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized");
  }
};

export {initializeSocket , sendMessageToSocketId}