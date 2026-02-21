import { app } from "./app.js";
import http from "http";  // reuired if we want to use socket.io
import { initializeSocket } from "./socket.js";

const port = process.env.PORT || 3000;

const server = http.createServer(app)

initializeSocket(server);  // socket io initialization

server.listen(port , ()=>{
  console.log(`✅ Server is listening at ${port}`);
})
