import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contex/ShopContex";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className=" border-t border-b bg-gray-50 text-center">
      <div className=" inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full sm:w-1/2 w-3/4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <img src={assets.search_icon} className=" w-4" alt="search-icon" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        className=" inline w-3 cursor-pointer"
        alt="cross-icon"
      />
    </div>
  ) : null;
}

export default SearchBar;
