import React from "react";
import Tittle from "../component/Tittle";

function PlaceOrder() {
  return (
    <div className=" flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className=" flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className=" text-xl sm:text-2xl my-3">
          <Tittle text1={"delivery"} text2={"information"} />
        </div>
        <div className=" flex gap-3"></div>
      </div>
    </div>
  );
}

export default PlaceOrder;
