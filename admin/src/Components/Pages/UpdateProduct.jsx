import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UpdateProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: [],
    images: [null, null, null, null],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = window.location.pathname.split("/")[2]; // Assuming URL is /updateProduct/:id
        const res = await axios.get(`/getProduct/${productId}`);
        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    fetchProduct();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSizesChange = (size) => {
    setProduct((prev) =>
      prev.sizes.includes(size)
        ? prev.sizes.filter((item) => item !== size)
        : [...prev.sizes, size]
    );
  };

  const handleImageChange = (index, file) => {
    setProduct((prev) => {
      const newImages = [...prev.images];
      newImages[index] = file;
      return { ...prev, images: newImages };
    });
  };

  const validateImage = (file) => {
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    if (file && !validImageTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPEG, PNG, and WEBP are allowed.");
      return false;
    }
    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("subCategory", product.subCategory);
      formData.append("bestseller", product.bestseller);
      formData.append("sizes", JSON.stringify(product.sizes));

      product.images.forEach((image, index) => {
        if (image) formData.append(`image${index + 1}`, image);
      });

      const res = await axios.put(`/updateProduct/${product._id}`, formData);
      if (res.data.message) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* Image Uploads */}
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          {product.images.map((image, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className="w-20"
                src={image ? URL.createObjectURL(image) : ""}
                alt={`upload-${index + 1}`}
              />
              <input
                type="file"
                id={`image${index + 1}`}
                hidden
                onChange={(e) => {
                  if (validateImage(e.target.files[0])) {
                    handleImageChange(index, e.target.files[0]);
                  }
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Other Form Fields */}
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          name="name"
          onChange={handleInputChange}
          value={product.name}
          type="text"
          placeholder="enter Product name"
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          name="description"
          onChange={handleInputChange}
          value={product.description}
          placeholder="write Product description"
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            name="category"
            onChange={handleInputChange}
            value={product.category}
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
            onChange={handleInputChange}
            value={product.subCategory}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            name="price"
            onChange={handleInputChange}
            value={product.price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="0"
          />
        </div>
      </div>

      <div className="">
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "X", "XL", "XXL"].map((size) => (
            <div key={size} onClick={() => handleSizesChange(size)}>
              <p
                className={`${
                  product.sizes.includes(size)
                    ? "bg-black text-white"
                    : "bg-gray-100"
                } px-3 py-1 cursor-pointer border`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input name="bestseller" type="checkbox" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-44 py-3 bg-black hover:text-black hover:bg-green-600 text-white rounded-full"
      >
        Update Product
      </button>
    </form>
  );
}

export default UpdateProduct;
