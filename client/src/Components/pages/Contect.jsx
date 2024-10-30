import React from "react";
import Tittle from "../component/Tittle";
import { assets } from "../assets/assets";
import NewsLetter from "../component/NewsLetter";

function Contect() {
  return (
    <div>
      <div className=" text-center text-2xl pt-10 border-t">
        <Tittle text1={"contact"} text2={"us"} />
      </div>
      <div className=" my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className=" w-full md:max-w-[480px] "
          src={assets.contact_img}
          alt="contact-img"
        />
        <div className=" flex flex-col justify-center items-start gap-6">
          <p className=" font-semibold text-xl text-gray-600">Our Store</p>
          <p className=" text-gray-500">
            54709 willms Station <br /> suite 350,
          </p>
          <p className=" text-gray-500">
            Tel : (91) 123-456-789 <br />
            Email : test@gmail.com{" "}
          </p>
          <p className=" font-semibold text-xl text-gray-500">
            Careers at Forever
          </p>
          <p className=" text-gray-500">
            {" "}
            Lern more about our teams and job openings.
          </p>
          <button className=" border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
}

export default Contect;
