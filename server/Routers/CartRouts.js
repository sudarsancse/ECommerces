import express from "express";

import {
  addToCart,
  updatesCart,
  getUserCart,
} from "../Controls/CartControler.js";
import { authUser } from "../Middlewares/auth.js";

const CartRoutes = express.Router();

CartRoutes.post("/add-cart", authUser, addToCart);
CartRoutes.post("/get-cart", authUser, getUserCart);
CartRoutes.post("/update-cart", authUser, updatesCart);

export default CartRoutes;
