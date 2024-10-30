import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPass = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmitHandel = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      onClick={onSubmitHandel}
      className=" flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className=" inline-flex items-center gap-2 mb-2 mt-10">
        <p className=" prata-rgular text-3xl">{currentState}</p>
        <hr className=" border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        <>
          <input
            type="text"
            className=" w-full px-3 py-2 border border-gray-800 "
            placeholder="Email, Phone number"
            required
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Password"
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={handleShowPass}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
            />
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            className=" w-full px-3 py-2 border border-gray-800 "
            placeholder="Name"
            required
          />
          <input
            type="email"
            className=" w-full px-3 py-2 border border-gray-800 "
            placeholder="Email"
            required
          />
          <input
            type="text"
            className=" w-full px-3 py-2 border border-gray-800 "
            placeholder="Phone Number"
            required
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Password"
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={handleShowPass}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
            />
          </div>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Confirm Password"
              required
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
            />
          </div>
        </>
      )}

      <div className=" w-full flex justify-between text-sm mt-[-8px]">
        <p className=" cursor-pointer">Forget your password</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login
          </p>
        )}
      </div>
      <button className=" bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login;
