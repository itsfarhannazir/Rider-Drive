import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { captainDataConetxt } from "../context/CaptainContext";

const CaptainProtectedWrapper = ({ children }) => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(captainDataConetxt);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyCaptain = async () => {
      if (!token) {
        navigate("/captain-login");
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setCaptain(res.data.captain);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/captain-login");
      } finally {
        setLoading(false);
      }
    };

    verifyCaptain();
  }, [token]);

  if (loading) return <div>Loading...</div>;  

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
