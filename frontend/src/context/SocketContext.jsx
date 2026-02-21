import React from 'react'
import { useEffect } from 'react';
import { createContext } from 'react'
import {io} from "socket.io-client";

export const socketDataContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`)

const SocketContext = ({children}) => {

  useEffect(()=>{  // socket basic connection

    socket.on("connect" , () => {
      console.log("Connect to server");
    })

    socket.on("disconnect" , () =>{
      console.log("Disconnected from server");
    })

  } , [])

  return (
    <div>
      <socketDataContext.Provider value={{socket}}>
        {children}
      </socketDataContext.Provider>
    </div>
  )
}

export default SocketContext
