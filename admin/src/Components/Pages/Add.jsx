import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";

function Add({ token }) {
  const [images, setImages] = useState([false, false, false, false]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: [],
  });

  const handleInputChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSizeToggle = (size) =>
    handleInputChange(
      "sizes",
      formData.sizes.includes(size)
        ? formData.sizes.filter((item) => item !== size)
        : [...formData.sizes, size]
    );

  const handleImageChange = (index, file) =>
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, key === "sizes" ? JSON.stringify(value) : value)
      );
      images.forEach((img, i) => img && data.append(`image${i + 1}`, img));
      const res = await axios.post("/addProduct", data, {
        headers: { token },
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full gap-3">
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {images.map((img, i) => (
            <label key={i} htmlFor={`image${i}`}>
              <img
                className="w-20"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt="upload"
              />
              <input
                type="file"
                id={`image${i}`}
                hidden
                onChange={(e) => handleImageChange(i, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      {["name", "description", "price"].map((field, i) => (
        <div key={i} className="w-full">
          <p className="mb-2">Product {field}</p>
          <input
            type={field === "price" ? "number" : "text"}
            value={formData[field]}
            placeholder={`Enter product ${field}`}
            className="w-full max-w-[500px] px-3 py-2"
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        {[
          { key: "category", options: ["Men", "Women", "Kids"] },
          {
            key: "subCategory",
            options: ["Topwear", "Bottomwear", "Winterwear"],
          },
        ].map(({ key, options }) => (
          <div key={key}>
            <p className="mb-2">{`Product ${key}`}</p>
            <select
              className="w-full px-3 py-2"
              value={formData[key]}
              onChange={(e) => handleInputChange(key, e.target.value)}
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "X", "XL", "XXL"].map((size) => (
            <div
              key={size}
              className={`${
                formData.sizes.includes(size)
                  ? "bg-black text-white"
                  : "bg-gray-100"
              } px-3 py-1 cursor-pointer border`}
              onClick={() => handleSizeToggle(size)}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={formData.bestseller}
          onChange={() => handleInputChange("bestseller", !formData.bestseller)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-44 py-3 bg-black mt-4 text-white hover:text-black hover:bg-green-600 rounded-full"
      >
        Create Product
      </button>
    </form>
  );
}

export default Add;
