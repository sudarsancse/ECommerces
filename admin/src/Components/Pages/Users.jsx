import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Users() {
  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/listUsers");

      if (res.data.success) {
        setAllUsers(res.data.Users);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <p className=" mb-2"> All Users List</p>
      <div className=" flex flex-col gap-2">
        {/* -------List table Title ---------*/}
        <div className=" hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Name</b>
          <b>Email</b>
          <b>Number</b>
          <b className=" text-center">Action</b>
        </div>
        {allUsers.map((item, index) => {
          const { name, email, number } = item;
          return (
            <div
              className=" grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
              key={index}
            >
              <p className="">{name}</p>
              <p className="">{email}</p>
              <p className="">{number}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Users;
