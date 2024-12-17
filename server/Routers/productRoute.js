import express from "express";
import {
  addProduct,
  listProduct,
  removingProduct,
  singleProduct,
} from "../Controls/ProductControllers.js";
import upload from "../Middlewares/multer.js";

const productRoutes = express.Router();
// SDD PRODUCT
productRoutes.post(
  "/addProduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// * LIST PRODUCT
productRoutes.get("/listProduct", listProduct);

//! REMOVING PRODUCTS
productRoutes.post("/removingProduct", removingProduct);

// TODO SINGLE PRODUCT
productRoutes.post("/singleProduct", singleProduct);

export default productRoutes;
