import React from "react";
import { FaTwitter, FcGoogle } from "../assets/icons";
import { useDispatch } from "react-redux";
import useAuth from "../custom-hook/useAuth";
import { authActions } from "../redux/reducers/authSlice";
import { loginHandler } from "../utils";
import { useNavigate } from "react-router-dom";
import firebaseIcon from "../assets/firebase.png";
import reduxIcon from "../assets/redux.png";
import tailwindIcon from "../assets/tailwind.png";

export const Login = () => {
  const [loginWithGoogle] = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="h-88 text-white flex justify-center items-center">
      <div className="lg:w-1/3 h-1/2 p-8 bg-gray-900 rounded-xl">
        <h1 className="text-center text-2xl uppercase font-semibold">login</h1>
        <div className="flex relative pb-12 justify-center flex-col gap-8 items-center h-full">
          <button
            onClick={() =>
              loginHandler(loginWithGoogle, dispatch, authActions, navigate)
            }
            className="bg-white flex items-center gap-4 hover:bg-gray-300 text-black py-2 px-6 rounded-full"
            type="button"
          >
            <span>
              <FcGoogle size={20} />
            </span>
            <span> Sign in with Google</span>
          </button>
          <button
            disabled={true}
            className="bg-white cursor-not-allowed flex items-center gap-4 hover:bg-gray-300 text-black py-2 px-6 rounded-full"
            type="button"
          >
            <span className="text-cyan-500">
              <FaTwitter size={20} />
            </span>
            <span> Sign in with Twitter</span>
          </button>{" "}
          <div className="absolute bottom-2 my-2">
            <div className=" text-sm text-gray-400 my-2 space-mono text-center">
              {" "}
              Made with -
            </div>
            <div className="flex gap-4">
              <img
                title="Firebase"
                src={firebaseIcon}
                alt="firebase"
                className="h-6 w-6"
              />
              <img
                title="Redux-Toolkit"
                src={reduxIcon}
                alt="redux"
                className="h-6 w-6"
              />
              <img
                title="TailwindCSS"
                src={tailwindIcon}
                alt="tailwind"
                className="h-6 w-6"
              />
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="absolute bottom-2 text-gray-600 text-sm space-mono">
        Developed by Gaurav Sinha • 2022
      </div>
    </div>
  );
};
