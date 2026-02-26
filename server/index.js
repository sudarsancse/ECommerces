import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import routes from "./Routers/routes.js";
import productRoutes from "./Routers/productRoute.js";
import CartRoutes from "./Routers/CartRouts.js";
import PaymentRoutes from "./Routers/PaymentRoutes.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();

// ----- MONGODB CONNECTION ----- //
// Vercel runs serverless functions, so we need to check if a connection exists
// and reuse it to avoid multiple connections.
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

// ----- CLOUDINARY CONFIG ----- //
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// ----- MIDDLEWARE ----- //
app.use(express.json());
app.use(cors());

// ----- ROUTES ----- //
app.use("/", routes);
app.use("/", productRoutes);
app.use("/", CartRoutes);
app.use("/payment", PaymentRoutes);

// ----- EXPORT FOR VERCEL ----- //
export default async function handler(req, res) {
  await connectDB();
  app(req, res);
}
