import React from "react";
import { useContext } from "react";
import { ShopContext } from "../contex/ShopContex";
import { Link } from "react-router-dom";

function ProductsItems({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className=" text-gray-700 cursor-pointer">
      <div className=" overflow-hidden">
        <img
          src={image[0]}
          className=" hover:scale-110 transt ease-out"
          alt=""
        />
      </div>
      <p className=" pt-3 pb-1 text-sm">{name}</p>
      <p className=" text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
}

export default ProductsItems;
