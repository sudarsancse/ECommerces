import React, { useContext } from "react";
import { ShopContext } from "../contex/ShopContex";
import Tittle from "../component/Tittle";

function Orders() {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className=" border-t pt-16">
      <div className=" text-2xl">
        <Tittle text1={"my"} text2={"orders"} />
      </div>
      <div className="">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className=" py-4 border-b text-gray-700 flex flex-col  md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className=" flex items-start gap-6 text-sm">
              <img
                src={item.image[0]}
                alt="product-inage"
                className=" w-16 sm:w-28 "
              />
              <div>
                <p className=" sm:text-base font-medium">{item.name}</p>
                <div className=" flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className=" text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p className=" text-sm text-gray-400">Quantity : 1</p>
                  <p className=" text-sm text-gray-400"> Size : m</p>
                </div>
                <p>
                  Date : <span className=" text-gray-400">25, jul, 2024</span>
                </p>
              </div>
            </div>
            <div className=" md:w-1/2 flex justify-between ">
              <div className=" flex items-center gap-2">
                <p className=" min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className=" text-sm md:text-base"> Ready to Ship</p>
              </div>
              <button className=" border px-4 py-2 text-sm font-medium rounded-sm">
                Track order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
