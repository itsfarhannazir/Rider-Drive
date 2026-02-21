import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import { useContext } from "react";
import axios from "axios"

const UserProtectedWrapper = ({ children }) => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 

  const { setUser} = useContext(userDataContext);
  const [loading , setLoading] = useState(true);


useEffect(() => {
  const verifyUser = async () => {
    if (!token) {
      navigate("/user-login");
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/user-login");
    }finally{
      setLoading(false);
    }
  };

  verifyUser();
}, [token]);

  if(loading) return <div>Loading...</div>

  return <>{children}</>;
};

export default UserProtectedWrapper;
