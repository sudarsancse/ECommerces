import React, { useContext, useEffect } from "react";
import { ShopContext } from "../contex/ShopContex";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../App";

function Verify() {
  const { navigate, setCartItems, token } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const res = await axios.post(
        `${BASE_URL}/payment/verifyStripe`,
        { success, orderId },
        { headers: { token } },
      );
      console.log(res.data);

      if (res.data.success) {
        setCartItems({});
        navigate("/order");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
}

export default Verify;
