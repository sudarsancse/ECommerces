import express from "express";
import {
  addProduct,
  listProduct,
  removingProduct,
  singleProduct,
} from "../Controls/ProductControllers.js";
import upload from "../Middlewares/multer.js";
import adminAuth from "../Middlewares/adminAuth.js";

const productRoutes = express.Router();
// SDD PRODUCT
productRoutes.post(
  "/addProduct",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

//! REMOVING PRODUCTS
productRoutes.post("/removingProduct", adminAuth, removingProduct);

// TODO SINGLE PRODUCT
productRoutes.post("/singleProduct", singleProduct);

// * LIST PRODUCT
productRoutes.get("/listProduct", listProduct);

export default productRoutes;
