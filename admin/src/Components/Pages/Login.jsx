import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
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
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className=" flex items-center justify-center min-h-screen w-full">
      <div className=" bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className=" text-2xl font-bold mb-4">Admin panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className=" mb-3 min-w-72">
            <p className=" text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className=" rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="Enter Your email"
              required
            />
          </div>
          <div className=" mb-3 min-w-72">
            <p className=" text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className=" rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="Password"
              placeholder=" Enter Your Password"
              required
            />
          </div>
          <button
            className=" mt-2 w-full py-2 px-4 bg-black rounded-md hover:bg-green-600 text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
