import React, { useState } from "react";
import Tittle from "../component/Tittle";
import CartTotal from "../component/CartTotal";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { ShopContext } from "../contex/ShopContex";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const [fromData, setFromData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const {
    navigate,
    token,
    cartItems,
    setCartItems,
    delivery_fee,
    products,
    getCartAmount,
  } = useContext(ShopContext);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFromData((data) => ({ ...data, [name]: value }));
  };

  const OnSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let OrderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              OrderItems.push(itemInfo);
            }
          }
        }
      }

      let OrderData = {
        address: fromData,
        items: OrderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const res = await axios.post("/payment/cod", OrderData, {
            headers: { token },
          });

          console.log(res.data);

          if (res.data.success) {
            toast.success(res.data.message);
            setCartItems({});
            navigate("/order");
          } else {
            toast.error(res.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={OnSubmitHandler}
      className=" flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      <div className=" flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className=" text-xl sm:text-2xl my-3">
          <Tittle text1={"delivery"} text2={"information"} />
        </div>
        <div className=" flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={fromData.firstName}
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={fromData.lastName}
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={fromData.email}
          className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={fromData.street}
          className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className=" flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={fromData.city}
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={fromData.state}
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className=" flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={fromData.zipcode}
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zpicode"
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={fromData.country}
            className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={fromData.phone}
          className=" border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
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
              type="submit"
              className=" bg-green-600 uppercase text-white px-16 py-3 text-sm"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
