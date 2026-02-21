import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 201) {
          localStorage.removeItem("token");
          navigate("/user-login");
          toast.success("Logout succesfully");
        }
      } catch (err) {
        console.error("Logout failed", err);
        toast.error("Logout failed")
      }
    };

    logoutUser();
  }, [navigate, token]);

  return <div>Logging out...</div>;
};

export default UserLogout;
