import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contex/ShopContex";
import Tittle from "./Tittle";
import ProductsItems from "./ProductsItems";

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className=" my-10">
      <div className=" text-center py-8 text-3xl">
        <Tittle text1={"LATEST"} text2={"COLLECTION"} />
        <p className=" w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          facilis sint reiciendis, est soluta nihil, dignissimos aspernatur
          veniam cum, quibusdam corporis. Hic dicta a repudiandae nisi sed.
          Corporis, est soluta?
        </p>
      </div>
      {/* product rendering */}
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductsItems
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
