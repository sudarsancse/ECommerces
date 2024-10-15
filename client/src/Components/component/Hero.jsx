import React from "react";

function Hero() {
  return (
    <div className=" flex flex-col sm:flex-row border border-gray-400">
      {/* left side */}
      <div className=" w-full sm:w-1/2 flex justify-center py-10 items-center sm:py-0">
        <div className=" text-[#41414]">
          <div className=" flex items-center gap-2">
            <p className=" w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className=" uppercase font-medium text-sm md:text-base">
              Our BestSellers
            </p>
          </div>
          <h1 className=" text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className=" flex items-center gap-2">
            <p className=" font-semibold text-sm md:text-base uppercase">
              {" "}
              Shop now
            </p>
            <p className=" w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
