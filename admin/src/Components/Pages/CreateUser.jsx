// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// function CreateUser() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/adminSignup", {
//         name,
//         email,
//         password,
//       });
//       if (res.data.success) {
//         toast.success(res.data.message);
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Signup failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
//         <h1 className="text-2xl font-bold mb-4">Create user</h1>
//         <form onSubmit={onSubmitHandler}>
//           {/* Name Field */}
//           <div className="mb-3 min-w-72">
//             <p className="text-sm font-medium text-gray-700 mb-2">Name</p>
//             <input
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
//               type="text"
//               placeholder="Enter Your Name"
//               required
//             />
//           </div>

//           {/* Email Field */}
//           <div className="mb-3 min-w-72">
//             <p className="text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </p>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
//               type="email"
//               placeholder="Enter Your Email"
//               required
//             />
//           </div>

//           {/* Role section */}

//           {/* Password Field */}
//           <div className="mb-3 min-w-72">
//             <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
//             <div className="relative">
//               <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 className="rounded-md w-full px-3 py-2 pr-10 border border-gray-300 outline-none"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter Your Password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
//               >
//                 <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             className="mt-2 w-full py-2 px-4 bg-black rounded-md hover:bg-green-600 text-white"
//             type="submit"
//           >
//             Create user
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateUser;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role is "user"
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/adminSignup", {
        name,
        email,
        password,
        role,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create User</h1>
        <form onSubmit={onSubmitHandler}>
          {/* Name Field */}
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="text"
              placeholder="Enter Your Name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="Enter Your Email"
              required
            />
          </div>

          {/* Role Field */}
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Role</p>
            <select
              onChange={(e) => setRole(e.target.value)}
              value={role}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              required
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Password Field */}
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="rounded-md w-full px-3 py-2 pr-10 border border-gray-300 outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="mt-2 w-full py-2 px-4 bg-black rounded-md hover:bg-green-600 text-white"
            type="submit"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
