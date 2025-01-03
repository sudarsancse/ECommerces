import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { currency } from "../../App";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function List({ token }) {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const res = await axios.get("/listProduct");

      if (res.data.success) {
        setList(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  /* delete product */

  const removProduct = async (id) => {
    try {
      const res = await axios.post(
        "/removingProduct",
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  /* update product */

  const updateProduct = async (id) => {
    try {
      navigate(`/updateProduct/${id}`);
      toast.info(`Redirecting to update the product`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className=" mb-2"> All Product List</p>
      <div className=" flex flex-col gap-2">
        {/* -------List table Title ---------*/}
        <div className=" hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className=" text-center">Action</b>
        </div>
        {/* ------ product List---- */}
        {list.map((item, index) => (
          <div
            className=" grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img src={item.image[0]} alt={item.image[0]} />
            <p className="">{item.name}</p>
            <p className="">{item.category}</p>
            <p className="">
              {currency}
              {item.price}
            </p>
            <div className="flex items-center justify-center space-x-2">
              <FontAwesomeIcon
                onClick={() => updateProduct(item._id)}
                className="hover:text-black cursor-pointer text-lg"
                icon={faPenToSquare}
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => removProduct(item._id)}
                className="hover:text-black cursor-pointer text-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
