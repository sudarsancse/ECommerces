import { Route, Routes } from "react-router-dom";
import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import About from "./Components/pages/About";
import Orders from "./Components/pages/Orders";
import Cart from "./Components/pages/Cart";
import Contect from "./Components/pages/Contect";
import PlaceOrder from "./Components/pages/PlaceOrder";
import Product from "./Components/pages/Product";
import Collection from "./Components/pages/Collection";
import Navbar from "./Components/component/Navbar";
import Footer from "./Components/component/Footer";
import SearchBar from "./Components/component/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className=" px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contect />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
