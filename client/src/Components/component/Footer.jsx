import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <div>
      <div className=" flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className=" mb-5 w-32" alt="" />
          <p className=" text-gray-600 md:w-2/3 w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            aperiam
          </p>
        </div>
        <div>
          <p className=" text-xl font-medium mb-5 uppercase">Company</p>
          <ul className=" flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className=" text-xl font-medium mb-5 uppercase">Get in tuch</p>
          <ul className=" flex flex-col gap-1 text-gray-600">
            <li>+1-123-156-7890</li>
            <li>contact@tranding.com</li>
          </ul>
        </div>

        <div>
          <hr />
          <p className=" py-5 text-center text-sm">
            Copyright 2024@ tranding.com - All right Reserve
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
