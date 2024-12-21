import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contex/ShopContex";
import { assets } from "../assets/assets";
import Tittle from "../component/Tittle";
import ProductsItems from "../component/ProductsItems";

function Collection() {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const subTogglecategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setsubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setsubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const filterApply = () => {
    let productsCopy = products.slice();

    // search function

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    //

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  // sort by Features function

  const sortProducts = () => {
    let filterPCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(filterPCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(filterPCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        filterApply();
        break;
    }
  };

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    filterApply();
  }, [category, subCategory, search, showSearch, products]);

  return (
    <div className=" flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter */}
      <div className=" min-w-60">
        <p
          onClick={() => {
            setShowFilter(!showFilter);
          }}
          className=" my-2 flex items-center gap-2 text-xl cursor-pointer "
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={` h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt="dropdown_icon"
          />
        </p>
        {/* category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className=" mb-3 text-sm font-medium ">Categories</p>
          <div className=" flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className=" flex gap-2">
              <input
                className=" w-3 "
                type="checkbox"
                value={"Men"}
                onChange={togglecategory}
              />
              men
            </p>
            <p className=" flex gap-2">
              <input
                className=" w-3 "
                type="checkbox"
                value={"Women"}
                onChange={togglecategory}
              />
              Women
            </p>
            <p className=" flex gap-2">
              <input
                className=" w-3 "
                type="checkbox"
                value={"Kids"}
                onChange={togglecategory}
              />
              kids
            </p>
          </div>
        </div>
        {/* sub filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5  sm:block ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className=" mb-3 text-sm font-medium ">Types</p>
          <div className=" flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className=" flex gap-2">
              <input
                className=" w-3 "
                type="checkbox"
                value={"Topwear"}
                onChange={subTogglecategory}
              />
              Topwear
            </p>
            <p className=" flex gap-2">
              <input
                className=" w-3 "
                type="checkbox"
                value={"Bottomwear"}
                onChange={subTogglecategory}
              />
              Bottomwear
            </p>
            <p className=" flex gap-2">
              <input
                className=" w-3 "
                type="checkbox"
                value={"Winterwear"}
                onChange={subTogglecategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* ui for right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Tittle text1={"ALL"} text2={"COLLECTION"} />
          {/* product sorting */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className=" border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* map product */}
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 ">
          {filterProducts.map((item, index) => (
            <ProductsItems
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
