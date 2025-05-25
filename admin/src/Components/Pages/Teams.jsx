import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Teams({ token }) {
  const [loginUser, setLoginUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/roleUsers", {
        headers: {
          token: token,
        },
      });
      if (res.data.success) {
        setAllUsers(res.data.Users);
        setLoginUser(res.data.loginUserDetails);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error fetching users");
    }
  };

  // Update role on the server
  const handleRoleChange = async (userId, newRole, currentRole) => {
    try {
      const res = await axios.post(
        "/updateRole",
        { userId, newRole, currentRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Role updated successfully");
        setAllUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleColorClass = (role) => {
    switch (role) {
      case "admin":
        return "text-red-600 font-semibold";
      case "manager":
        return "text-green-500 font-semibold";
      case "user":
        return "text-blue-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div>
      <p className="mb-2 text-lg font-semibold">Our Team</p>
      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_2fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-bold">
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Role</span>
        </div>

        {/* Team Member Rows */}
        {allUsers.map((member, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] md:grid-cols-[1fr_2fr_2fr_1fr] items-center py-2 px-3 border text-sm"
            key={member._id || index}
          >
            <p>{member.name}</p>
            <p>{member.email}</p>
            <p>{member.number || "N/A"}</p>

            <div
              className={`relative hidden md:block ${
                member.email === loginUser.email ||
                (loginUser.role === "manager" && member.role === "admin") ||
                (loginUser.role === "user" &&
                  (member.role === "admin" || member.role === "manager"))
                  ? "pointer-events-auto"
                  : ""
              }`}
              onClick={(e) => {
                if (member.email === loginUser.email) {
                  e.stopPropagation();
                  toast.error("You can't change your own role");
                } else if (
                  loginUser.role === "manager" &&
                  member.role === "admin"
                ) {
                  e.stopPropagation();
                  toast.error("Managers can't change admin roles");
                } else if (
                  loginUser.role === "user" &&
                  (member.role === "admin" || member.role === "manager")
                ) {
                  e.stopPropagation();
                  toast.error("Users can't change admin or manager roles");
                }
              }}
            >
              <select
                className={`w-full border rounded px-2 py-1 outline-none ${
                  member.email === loginUser.email ||
                  (loginUser.role === "manager" && member.role === "admin") ||
                  (loginUser.role === "user" &&
                    (member.role === "admin" || member.role === "manager"))
                    ? "cursor-not-allowed opacity-60 bg-gray-100"
                    : "cursor-pointer"
                } ${getRoleColorClass(member.role)}`}
                value={member.role}
                onChange={(e) => {
                  if (
                    member.email === loginUser.email ||
                    (loginUser.role === "manager" && member.role === "admin") ||
                    (loginUser.role === "user" &&
                      (member.role === "admin" || member.role === "manager"))
                  ) {
                    e.preventDefault();
                    return;
                  }
                  handleRoleChange(member._id, e.target.value, member.role);
                }}
                disabled={
                  member.email === loginUser.email ||
                  (loginUser.role === "manager" && member.role === "admin") ||
                  (loginUser.role === "user" &&
                    (member.role === "admin" || member.role === "manager"))
                }
              >
                <option value="admin" className="text-red-600">
                  Admin
                </option>
                <option value="manager" className="text-green-500">
                  Manager
                </option>
                <option value="user" className="text-blue-600">
                  User
                </option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
