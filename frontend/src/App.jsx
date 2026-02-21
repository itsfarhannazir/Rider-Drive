import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import CaptainSignUp from "./pages/CaptainSignUp";
import CaptainLogin from "./pages/CaptainLogin";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import Riding from "./pages/Riding";
import CaptainHome from "./pages/CaptainHome";
import CaptainRiding from "./pages/CaptainRiding";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        // Protected Routes
        <Route
          path="/home"
          element={
            // check if the user is login or not bcz we can go to home when the user is login
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user-logout"
          element={
            // check if the user is login or not bcz we can on ly logout when the user is login
              <UserProtectedWrapper>
                <UserLogout />
              </UserProtectedWrapper>
          }
        />
        <Route
          path="/captain-logout"
          element={
            <CaptainProtectedWrapper>
              <CaptainLogout />
            </CaptainProtectedWrapper>
          }
        />

        <Route 
        path="/riding" 
        element = {<Riding />}
        />

        <Route 
        path="/captain-riding" 
        element = {<CaptainRiding />}
        />

        <Route 
        path="/captain-home"
        element = {
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
      }  
        />

      </Routes>

      <Toaster position="top-center" />
    </>
  );
};

export default App;
