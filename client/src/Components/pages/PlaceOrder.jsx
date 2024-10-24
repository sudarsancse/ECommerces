import React, { useState } from "react";
import Tittle from "../component/Tittle";
import CartTotal from "../component/CartTotal";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { ShopContext } from "../contex/ShopContex";

function PlaceOrder() {
  const [method, setMethod] = useState("cod");

  const { navigate } = useContext(ShopContext);

  return (
    <div className=" flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className=" flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className=" text-xl sm:text-2xl my-3">
          <Tittle text1={"delivery"} text2={"information"} />
        </div>
        <div className=" flex gap-3">
          <input
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
        />
        <input
          className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <input
          className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
        />
        <div className=" flex gap-3">
          <input
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className=" flex gap-3">
          <input
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="Number"
            placeholder="Zpicode"
          />
          <input
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="Number"
          placeholder="Phone Number"
        />
      </div>
      {/* right side */}
      <div className=" mt-8">
        <div className=" mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className=" mt-12">
          <Tittle text1={"payment"} text2={"Method"} />
          <div className=" flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className=" flex items-center cursor-pointer border p-2 px-3 gap-3"
            >
              <p
                className={` min-w-3 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                className=" h-5 mx-4"
                src={assets.stripe_logo}
                alt="stripe-logo"
              />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className=" flex items-center cursor-pointer border p-2 px-3 gap-3"
            >
              <p
                className={` min-w-3 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                className=" h-5 mx-4"
                src={assets.razorpay_logo}
                alt="razorpay-logo"
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className=" flex items-center cursor-pointer border p-2 px-3 gap-3"
            >
              <p
                className={` min-w-3 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className=" text-gray-500 text-sm font-medium mx-4">
                Cash on Delivery
              </p>
            </div>
          </div>
          <div className=" w-full text-start mt-8">
            <button
              onClick={() => navigate("/order")}
              className=" bg-green-600 uppercase text-white px-16 py-3 text-sm"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
