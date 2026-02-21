import Logo from "../../public/logo.png";
import bgImage from "../../public/b_pic.avif";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div
        className=" bg-[url(bgImage)] w-full h-screen flex flex-col justify-between bg-center bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <img className="w-25 mt-3" src={Logo} alt="" />

        <div className="bg-white py-6 px-5 flex flex-col items-center justify-center gap-5">
          <p className="font-semibold">Getting started with Rider</p>

          <Link
            to="/user-login"
            className="bg-black inline-block text-center font-bold text-white py-2 w-full rounded "
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
