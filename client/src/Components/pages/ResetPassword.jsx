import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ShopContext } from "../contex/ShopContex";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { id } = useParams();
  const { navigate } = useContext(ShopContext);

  const handleShowPass = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!/[A-Z]/.test(newPassword && confirmPassword)) {
      return toast.error(
        "Password must include at least one uppercase letter."
      );
    }
    if (!/\d/.test(newPassword && confirmPassword)) {
      return toast.error("Password must include at least one digit.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword && confirmPassword)) {
      return toast.error(
        "Password must include at least one special character."
      );
    }

    try {
      const ID = id;
      const res = await axios.post(`/updated-password/${ID}`, {
        newPassword,
        confirmPassword,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/login`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-rgular text-3xl">New Password</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      <div className="relative w-full">
        <input
          id="new-Password"
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Enter your New Password"
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
          id="confirm-Password"
          value={confirmPassword}
          type={showConfirmPassword ? "text" : "password"}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Enter your Conform Password"
          required
        />
        <FontAwesomeIcon
          icon={showConfirmPassword ? faEyeSlash : faEye}
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
        />
      </div>
      <button
        className="bg-black text-white font-light px-8 py-2"
        type="submit"
      >
        Update Password
      </button>
    </form>
  );
}

export default ResetPassword;
