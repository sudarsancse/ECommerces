import React from "react";

function ResetPassword() {
  return (
    <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-rgular text-3xl">New Password</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      <input
        id="New Password"
        type="password"
        //value={NewPassword}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Enter your New Password"
        required
      />
      <input
        id="C Password"
        type="password"
        // value={cPassword}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Enter your Conform Password"
        required
      />
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
