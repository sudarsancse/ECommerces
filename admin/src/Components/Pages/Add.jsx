import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function Add({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubSategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const fromData = new FormData();
      fromData.append("name", name);
      fromData.append("description", description);
      fromData.append("price", price);
      fromData.append("category", category);
      fromData.append("subCategory", subCategory);
      fromData.append("bestseller", bestseller);
      fromData.append("sizes", JSON.stringify(sizes));
      image1 && fromData.append("image1", image1);
      image2 && fromData.append("image2", image2);
      image3 && fromData.append("image3", image3);
      image4 && fromData.append("image4", image4);

      const res = await axios.post("/addProduct", fromData, {
        headers: { token: token },
      });
      if (res.data.message) {
        toast.success(res.data.message);
        setName("");
        setdescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toString.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toString.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className=" flex flex-col w-full items-star gap3"
    >
      <div>
        <p className=" mb-2">Upload Image</p>

        <div className=" flex gap-2">
          <label htmlFor="image1">
            <img
              className=" w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="uplod"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className=" w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="uplod"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className=" w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="uplod"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className=" w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="uplod"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className=" w-full">
        <p className=" mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="enter Product name"
          className=" w-full max-w-[500px] px-3 py-2 "
        />
      </div>

      <div className=" w-full">
        <p className=" mb-2">Product description</p>
        <textarea
          onChange={(e) => setdescription(e.target.value)}
          value={description}
          type="text"
          placeholder="write Product description"
          className=" w-full max-w-[500px] px-3 py-2 "
        />
      </div>

      <div className=" flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="">
          <p className="mb-2 ">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className=" w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="">
          <p className=" mb-2 ">Sub category</p>
          <select
            onChange={(e) => setSubSategory(e.target.value)}
            className=" w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className=" mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className=" w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="0"
          />
        </div>
      </div>

      <div className="">
        <p className=" mb-2">Product Sizes</p>
        <div className=" flex gap-3">
          <div
            onClick={(e) =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-black text-white " : "bg-gray-100"
              } px-3 py-1 cursor-pointer border`}
            >
              S
            </p>
          </div>
          <div
            onClick={(e) =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-black text-white " : "bg-gray-100"
              } px-3 py-1 cursor-pointer border`}
            >
              M
            </p>
          </div>
          <div
            onClick={(e) =>
              setSizes((prev) =>
                prev.includes("X")
                  ? prev.filter((item) => item !== "X")
                  : [...prev, "X"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("X") ? "bg-black text-white " : "bg-gray-100"
              } px-3 py-1 cursor-pointer border`}
            >
              X
            </p>
          </div>
          <div
            onClick={(e) =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-black text-white " : "bg-gray-100"
              } px-3 py-1 cursor-pointer border`}
            >
              XL
            </p>
          </div>
          <div
            onClick={(e) =>
              setSizes((prev) =>
                prev.includes("XLL")
                  ? prev.filter((item) => item !== "XLL")
                  : [...prev, "XLL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-black text-white " : "bg-gray-100"
              } px-3 py-1 cursor-pointer border`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className=" flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className=" cursor-pointer" htmlFor="bestseller">
          Add to bestseller{" "}
        </label>
      </div>

      <button
        type="submit"
        className=" w-44 py-3 bg-black mt-4 text-white hover:text-black hover:bg-green-600 rounded-full"
      >
        Create Producte
      </button>
    </form>
  );
}

export default Add;
