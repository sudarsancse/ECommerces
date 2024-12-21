import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ShopContext } from "../contex/ShopContex";

function Login() {
  const [formData, setFromData] = useState({});
  const [currentState, setCurrentState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { navigate, token, setToken } = useContext(ShopContext);

  const handelChange = (e) => {
    setFromData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleShowPass = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmitHandel = async (e) => {
    e.preventDefault();

    const { name, email, number, password, cpassword } = formData;

    if (currentState === "Sign up" && !name) {
      return toast.error("Please enter your name");
    }
    if (!email) {
      return toast.error("Please enter your email");
    }
    if (currentState === "Sign up" && !number) {
      return toast.error("Please enter your phone number");
    }
    if (!password) {
      return toast.error("Please enter your password");
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error(
        "Password must include at least one uppercase letter."
      );
    }
    if (!/\d/.test(password)) {
      return toast.error("Password must include at least one digit.");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return toast.error(
        "Password must include at least one special character."
      );
    }
    if (password.length < 8) {
      return toast.error(
        "Please enter a stronger password (at least 8 characters)"
      );
    }
    if (currentState === "Sign up" && password !== cpassword) {
      return toast.error("Passwords do not match");
    }

    try {
      if (currentState === "Sign up") {
        const res = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          toast.error(data.message);
          return;
        } else {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          toast.success(data.message);
        }
      } else {
        const res = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandel}
      className=" flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className=" inline-flex items-center gap-2 mb-2 mt-10">
        <p className=" prata-rgular text-3xl">{currentState}</p>
        <hr className=" border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        <>
          <input
            onChange={handelChange}
            id="email"
            type="text"
            className=" w-full px-3 py-2 border border-gray-800 "
            placeholder="Email, Phone number"
            required
          />
          <div className="relative w-full">
            <input
              onChange={handelChange}
              id="password"
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
            onChange={handelChange}
            id="name"
            type="text"
            className=" w-full px-3 py-2 border border-gray-800 "
            placeholder="Name"
            required
          />
          <input
            onChange={handelChange}
            id="email"
            type="email"
            className=" w-full px-3 py-2 border border-gray-800 "
            placeholder="Email"
            required
          />
          <input
            onChange={handelChange}
            id="number"
            type="text"
            className=" w-full px-3 py-2 border border-gray-800 "
            placeholder="Phone Number"
            required
          />
          <div className="relative w-full">
            <input
              onChange={handelChange}
              id="password"
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
              onChange={handelChange}
              id="cpassword"
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
