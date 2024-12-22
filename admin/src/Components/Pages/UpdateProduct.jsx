import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

function UpdateProduct({ token }) {
  const { id } = useParams();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    sizes: [],
    bestseller: false,
    image: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchProductData = async () => {
    try {
      const response = await axios.post("/singleProduct", { id });

      const product = response.data.data;

      // Populate the state with fetched product data
      setProductData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        subCategory: product.subCategory || "",
        price: product.price || "",
        sizes: product.sizes || [],

        bestseller: product.bestseller || false,
        image: product.image || [],
      });
    } catch (error) {
      toast.error("Failed to fetch product data.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setProductData({ ...productData, bestseller: e.target.checked });
  };

  const handleImageChange = (index, e) => {
    const newimage = [...productData.image];
    newimage[index] = URL.createObjectURL(e.target.files[0]);
    setProductData({ ...productData, image: newimage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`/updateProduct/${id}`, productData);
      if (res.data.message) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p className=" mb-2">Upload Image</p>

        <div className="flex gap-2">
          {Array(4)
            .fill()
            .map((_, index) => (
              <label key={index} htmlFor={`image${index + 1}`}>
                <img
                  className="w-20"
                  src={productData.image[index] || assets.upload_area}
                  alt={`Upload ${index + 1}`}
                />
                <input
                  type="file"
                  id={`image${index + 1}`}
                  hidden
                  onChange={(e) => handleImageChange(index, e)}
                />
              </label>
            ))}
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          placeholder="Enter product name"
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          placeholder="Write product description"
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select
            name="subCategory"
            value={productData.subCategory}
            onChange={handleInputChange}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product price</p>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 sm:w-[120px]"
            placeholder="0"
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product sizes</p>
        <div className="flex gap-3">
          {["S", "M", "X", "XL", "XXL"].map((size) => (
            <div key={size}>
              <p
                className={`px-3 py-1 cursor-pointer border ${
                  productData.sizes.includes(size)
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                onClick={() =>
                  setProductData((prevData) => ({
                    ...prevData,
                    sizes: prevData.sizes.includes(size)
                      ? prevData.sizes.filter((s) => s !== size)
                      : [...prevData.sizes, size],
                  }))
                }
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={productData.bestseller}
          onChange={handleCheckboxChange}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-44 py-3 ${
          isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-black"
        } mt-4 text-white ${
          isLoading ? "" : "hover:text-black hover:bg-green-600"
        } rounded-full`}
      >
        {isLoading ? "Loading..." : "Update Product"}
      </button>
    </form>
  );
}

export default UpdateProduct;
