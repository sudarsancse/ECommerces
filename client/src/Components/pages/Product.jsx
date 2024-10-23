import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../contex/ShopContex";
import { assets } from "../assets/assets";
import RelatedProduct from "../component/RelatedProduct";
import { toast } from "react-toastify";

function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);

  const handleSizeSelect = (selectedSize) => {
    setSize(selectedSize);
    setSizeError(false);
  };

  const handleAddToCart = () => {
    if (!size) {
      setSizeError(true);
      toast.error("Please select a size before adding to cart.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setSizeError(false);
      addToCart(productData._id, size);
      toast.success("Product added to cart successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId, products]);

  return productData ? (
    <div className=" border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className=" flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* products images */}
        <div className=" flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className=" justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              // eslint-disable-next-line jsx-a11y/alt-text
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className=" w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className=" w-full sm:w-[80%]">
            <img className=" w-full h-auto" src={image} alt="product-image" />
          </div>
        </div>
        {/* product info */}
        <div className=" flex-1">
          <h1 className=" font-medium text-2xl mt-2">{productData.name}</h1>
          <div className=" flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star-icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3 5" />
            <img
              src={assets.star_dull_icon}
              alt="star-dull-icon"
              className="w-3 5"
            />
            <p className=" pl-2">(122)</p>
          </div>
          <p className=" mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className=" mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className=" flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className=" flex  gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => handleSizeSelect(item)}
                  className={` border rounded-full py-2 px-4 ${
                    item === size
                      ? " bg-black text-white"
                      : `bg-gray-100 ${
                          sizeError
                            ? "border-red-500 border-2 shake"
                            : "border-gray-300"
                        }`
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className=" uppercase bg-black text-white px-8 py-3 text-sm active:bg-gray-700 "
          >
            Add to cart
          </button>
          <hr className=" mt-8 sm:w-4/5" />
          <div className=" text-sm text-gray-500 mt-5 flex flex-col gap1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy retuen and exchange policy with in 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description and review sec */}
      <div className=" mt-20">
        <div className=" flex">
          <b className=" border px-5 py-3 text-sm">Description</b>
          <p className=" border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className=" flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima ad
            iure omnis iste iusto, praesentium ea error explicabo fugiat velit
            beatae eaque at totam aliquam nemo quis eum alias? Maxime.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sapiente
            nobis asperiores molestiae eos sequi neque et reiciendis quas quidem
            officiis quasi eligendi exercitationem blanditiis, libero eum
            adipisci, ipsa explicabo!
          </p>
        </div>
      </div>

      {/* related products */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className=" opacity-0"></div>
  );
}

export default Product;
