import { createContext, useState } from "react";

export const captainDataConetxt = createContext();

const CaptainContext = ({ children }) => {

  const [captain, setCaptain] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    vehicle: {
      plate: "",
      capacity: "",
      color: "",
      vehicleType: "",
    },
  });

  return (
    <div>
      <captainDataConetxt.Provider value={{captain , setCaptain}}>
        {children}
      </captainDataConetxt.Provider>
    </div>
  );
};

export default CaptainContext;
