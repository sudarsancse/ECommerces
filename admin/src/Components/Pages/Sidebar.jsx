import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUsers,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  return (
    <div className=" w-[18%] min-h-screen border-r-2">
      <div className=" flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-2 py-2 rounded-1"
          to="/add"
        >
          <img className=" w-5 h-5" src={assets.add_icon} alt="add-icon" />
          <p className=" hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-2 py-2 rounded-1"
          to="/list"
        >
          <img className=" w-5 h-5" src={assets.order_icon} alt="add-icon" />
          <p className=" hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-2 py-2 rounded-1"
          to="/orders"
        >
          <img className=" w-5 h-5" src={assets.order_icon} alt="add-icon" />
          <p className=" hidden md:block">Orders</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-2 py-2 rounded-1"
          to="/create_user"
        >
          <FontAwesomeIcon className=" w-5 h-5" icon={faUserPlus} />
          <p className=" hidden md:block">Create user</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-2 py-2 rounded-1"
          to="/teams"
        >
          <FontAwesomeIcon className=" w-5 h-5" icon={faPeopleGroup} />
          <p className=" hidden md:block">Teams</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-2 py-2 rounded-1"
          to="/Users"
        >
          <FontAwesomeIcon className=" w-5 h-5" icon={faUsers} />
          <p className=" hidden md:block">Users</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
