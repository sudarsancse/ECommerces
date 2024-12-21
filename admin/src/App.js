import Navbar from "./Components/Pages/Navbar";
import Sidebar from "./Components/Pages/Sidebar";
import Add from "./Components/Pages/Add";
import List from "./Components/Pages/List";
import Orders from "./Components/Pages/Orders";
import Login from "./Components/Pages/Login";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import UpdateProduct from "./Components/Pages/UpdateProduct";

export const currency = "RS ";

function App() {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    const lastVisit = localStorage.getItem("lastVisit");

    // Check if 30 seconds have passed since the last visit
    if (savedToken && lastVisit) {
      const timeElapsed = Date.now() - parseInt(lastVisit, 10);
      if (timeElapsed > 30000) {
        localStorage.removeItem("token");
        return "";
      }
    }
    return savedToken || "";
  });

  useEffect(() => {
    // Save token to localStorage whenever it changes
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    // Save the timestamp when the user closes the website
    const handleBeforeUnload = () => {
      localStorage.setItem("lastVisit", Date.now().toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className=" flex w-full">
            <Sidebar />
            <div className=" w-[70%] ml-[max(5vw,25px)] my-8 mx-auto text-gray-400 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/updateProduct/:id" element={<UpdateProduct />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
