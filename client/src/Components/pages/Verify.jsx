import React, { useContext } from "react";
import { ShopContext } from "../contex/ShopContex";
import { useSearchParams } from "react-router-dom";

function Verify() {
  const { navigate, setCartItems, token } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const verifyPayment = async () => {};
  return (
    <div>
      <h1></h1>
    </div>
  );
}

export default Verify;
