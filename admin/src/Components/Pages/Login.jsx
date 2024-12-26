import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login({ setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentState, setCurrentState] = useState("Login"); // Login or SignUp state

  const onSubmitHandler = async (e) => {
    try {
      if (currentState === "Login") {
        e.preventDefault();
        const res = await axios.post("/admin", {
          email,
          password,
        });
        if (res.data.success) {
          setToken(res.data.token);
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post("/adminSignup", {
          name,
          email,
          password,
        });
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          {currentState === "Login" ? "Admin Panel" : "Admin Sign Up"}
        </h1>
        <form onSubmit={onSubmitHandler}>
          {/* Name Field - Only for SignUp */}
          {currentState === "SignUp" && (
            <div className="mb-3 min-w-72">
              <p className="text-sm font-medium text-gray-700 mb-2">Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                type="text"
                placeholder="Enter Your Name"
                required
              />
            </div>
          )}
          {/* Email Field */}
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="Enter Your Email"
              required
            />
          </div>
          {/* Password Field */}
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="rounded-md w-full px-3 py-2 pr-10 border border-gray-300 outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          {/* Forgot Password Link - Only for Login */}
          {currentState === "Login" && (
            <p className="cursor-pointer text-sm text-right text-blue-600 mb-3">
              Forgot your password?
            </p>
          )}
          {/* Submit Button */}
          <button
            className="mt-2 w-full py-2 px-4 bg-black rounded-md hover:bg-green-600 text-white"
            type="submit"
          >
            {currentState === "Login" ? "Login" : "Sign Up"}
          </button>
          {/* Toggle Buttons */}
          {currentState === "Login" && (
            <button
              type="button"
              onClick={() => setCurrentState("SignUp")}
              className="mt-2 w-full py-2 px-4 bg-red-600 hover:bg-green-600 rounded-md text-white"
            >
              Create Account
            </button>
          )}
        </form>
        {currentState === "SignUp" && (
          <button
            type="button"
            onClick={() => setCurrentState("Login")}
            className="mt-3 text-sm text-blue-600"
          >
            Already have an account? Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
