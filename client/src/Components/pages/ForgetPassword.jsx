import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../contex/ShopContex";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const { navigate } = useContext(ShopContext);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter your email");
    }

    try {
      const res = await fetch("/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setStep(2); // Move to Step 2: OTP input
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      return toast.error("Please enter the OTP");
    }

    try {
      const res = await fetch("/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        // Redirect to reset password or home page as needed
        navigate(`/resetPassword/${data.ID}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(`Failed to verify OTP. Please try again. ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={step === 1 ? handleSendEmail : handleVerifyOtp}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-rgular text-3xl">Forget Password</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {step === 1 ? (
        <>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter your Email"
            required
          />
          <button
            className="bg-black text-white font-light px-8 py-2"
            type="submit"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter your OTP"
            required
          />
          <button
            className="bg-black text-white font-light px-8 py-2"
            type="submit"
          >
            Verify OTP
          </button>
        </>
      )}
    </form>
  );
}

export default ForgetPassword;
