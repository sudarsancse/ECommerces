import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import About from "./Components/pages/About";
import Orders from "./Components/pages/Orders";
import Cart from "./Components/pages/Cart";
import Contect from "./Components/pages/Contect";
import PlaceOrder from "./Components/pages/PlaceOrder";
import Product from "./Components/pages/Product";
import Collection from "./Components/pages/Collection";

function App() {
  return (
    <div className=" px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contect" element={<Contect />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/product" element={<Product />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
    </div>
  );
}

export default App;
