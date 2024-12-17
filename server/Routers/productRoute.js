import express from "express";
import {
  addProduct,
  listProduct,
  removingProduct,
  singleProduct,
} from "../Controls/ProductControllers.js";

const productRoutes = express.Router();
// SDD PRODUCT
productRoutes.post("/addProduct", addProduct);

// * LIST PRODUCT
productRoutes.get("/listProduct", listProduct);

//! REMOVING PRODUCTS
productRoutes.post("/removingProduct", removingProduct);

// TODO SINGLE PRODUCT
productRoutes.post("/singleProduct", singleProduct);

export default productRoutes;
