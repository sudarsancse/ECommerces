import productModel from "../Models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

// function for add products
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item != undefined
    );

    let imageURL = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
          folder: "Trending E-Com",
        });

        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imageURL,
      date: Date.now(),
    };

    const product = new productModel(productData);

    await product.save();

    res.json({ success: true, message: "Add product" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// * function list produce (GET req)
export const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, message: "Add product", products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//! function for removing product
export const removingProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "product removed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// TODOs function for single product

export const singleProduct = async (req, res) => {
  try {
    const product = req.body.id;

    const data = await productModel.findById(product);
    res.json({ success: true, message: "product found Successfully", data });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ? function for updating product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    category,
    subCategory,
    price,
    sizes,
    bestseller,
    images,
  } = req.body;

  //console.log(req.body);
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        subCategory,
        price,
        sizes,
        bestseller,
        images,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
