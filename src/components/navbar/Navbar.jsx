import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  BsFillBookmarkStarFill,
  BsFillMoonStarsFill,
  HiOutlineLogout,
  SiBuzzfeed,
} from "../../assets/icons";
import defaultImg from "../../assets/user.png";
import useAuth from "../../custom-hook/useAuth";
import { authActions } from "../../redux/reducers/authSlice";
import { dataActions } from "../../redux/reducers/dataSlice";
import { loginHandler, logoutHandler } from "../../utils";

export const Navbar = (props) => {
  const { toggleTheme, theme } = props;
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loginWithGoogle, logOut] = useAuth();
  return (
    <>
      <nav>
        <div
          className={`text-xl flex flex-row  p-1 justify-center md:justify-between items-center ${
            theme ? "bg-white " : "bg-black"
          }`}
        >
          <div className="ml-8  text-white hidden md:flex">
            <Link to="/">
              <div className="bubblegum text-gray-500 uppercase cursor-pointer opacity-90 hover:opacity-100">
                pix
                <span className=" text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600 font-bold">
                  zone
                </span>
              </div>
            </Link>
          </div>
          <div className="flex flex-row mr-8 md:justify-end justify-evenly w-full">
            <div
              title="Explore"
              className={`text-gray-600 ${
                theme
                  ? "hover:text-black text-gray-600"
                  : "hover:text-white text-gray-300"
              } text-center px-2 py-2 m-2  cursor-pointer`}
            >
              <Link to="/">
                <SiBuzzfeed />
              </Link>
            </div>
            <div
              title="Explore"
              className={`text-gray-600 ${
                theme
                  ? "hover:text-black text-gray-600"
                  : "hover:text-white text-gray-300"
              } text-center px-2 py-2 m-2  cursor-pointer`}
            >
              <Link to="/">
                <BsFillBookmarkStarFill />
              </Link>
            </div>{" "}
            <div
              title="Explore"
              onClick={toggleTheme}
              className={`text-gray-600 ${
                theme
                  ? "hover:text-black text-gray-600"
                  : "hover:text-white text-gray-300"
              } text-center px-2 py-2 m-2  cursor-pointer`}
            >
              <Link to="/">
                <BsFillMoonStarsFill />
              </Link>
            </div>
            <div
              onClick={() =>
                loginHandler(loginWithGoogle, dispatch, authActions)
              }
              title={auth.isAuthenticated ? auth.user.displayName : "Login"}
              className={`text-gray-600 ${
                theme
                  ? "hover:text-black text-gray-600"
                  : "hover:text-white text-gray-300"
              } text-center pl-6  mr-4 py-2 m-2 gap-2 text-sm flex justify-center items-center cursor-pointer`}
            >
              <div className="bg-gray-300 h-6 w-6  rounded-full overflow-hidden">
                <img
                  src={auth.isAuthenticated ? auth.user?.photoURL : defaultImg}
                  alt={auth.user?.displayName}
                />
              </div>
              {auth.isAuthenticated && <div> {auth.user?.displayName}</div>}
            </div>
          </div>{" "}
          {auth.isAuthenticated && (
            <div
              title="logout"
              onClick={() =>
                logoutHandler(logOut, dispatch, dataActions, authActions)
              }
              className={`text-gray-600 ${
                theme
                  ? "hover:text-black text-gray-600"
                  : "hover:text-white text-gray-300"
              } text-center pl-6 mr-4 py-2 m-2  cursor-pointer`}
            >
              <HiOutlineLogout />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
