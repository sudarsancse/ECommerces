import Navbar from "./Components/Pages/Navbar";
import Sidebar from "./Components/Pages/Sidebar";
import Add from "./Components/Pages/Add";
import List from "./Components/Pages/List";
import Orders from "./Components/Pages/Orders";
import Login from "./Components/Pages/Login";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const [token, setToken] = useState("");
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar />
          <hr />
          <div className=" flex w-full">
            <Sidebar />
            <div className=" w-[70%] ml-[max(5vw,25px)] my-8 mx-auto text-gray-400 text-base">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
