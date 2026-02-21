import { createContext, useState } from "react";

export const distanceTimeDataContext = createContext();

const DistanceTimeContext = ({ children }) => {
  const [distanceTime, setDistanceTime] = useState({
    distance: '',
    duration: '',
  });

  return (
    <distanceTimeDataContext.Provider value={{ distanceTime, setDistanceTime }}>
      {children} 
    </distanceTimeDataContext.Provider>
  );
};

export default DistanceTimeContext;