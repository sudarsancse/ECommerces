import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets";
import { currency } from "../../App";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrderd = async () => {
    if (!token) {
      return null;
    }

    try {
      const res = await axios.post(
        "/payment/allOrders",
        {},
        { headers: { token } }
      );
      console.log(res.data);

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const res = await axios.post(
        "/payment/status",
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      console.log(res.data.message);

      if (res.data.success) {
        await fetchAllOrderd();
        toast.success(`Order status updated to ${res.data.status}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrderd();
  }, [token]);

  return (
    <div>
      <h3>Orders Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className=" grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <div className=" h-full flex items-center justify-center">
              <img
                className=" w-full"
                src={order.items[0]?.image || assets.parcel_icon}
                alt=""
              />
            </div>
            <div>
              <div>
                {order.items.map((item, index) => {
                  const { name, size, quantity } = item;
                  if (index === order.items.length - 1) {
                    return (
                      <p className=" py-0.5" key={index}>
                        {name} x {quantity} <span>{size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className=" py-0.5" key={index}>
                        {name} x {quantity} <span>{size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className=" mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className=" text-sm sm:text-[15px]">
                items : {order.items.length}
              </p>
              <p className=" mt-3">Method : {order.paymentMethod}</p>
              <p className=" ">
                payment : {order.payment ? "Done" : "Pending"}
              </p>
              <p className="">Date : {new Date(order.date).toDateString()}</p>
            </div>
            <p className=" text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className=" p-2 font-semibold"
            >
              <option value="Order Plased">Order Plased</option>
              <option value="Paking">Paking</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
