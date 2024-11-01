import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import routes from "./Routers/routes.js";
import { v2 as cloudinary } from "cloudinary";

const MONGO = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

const app = express();

//-----MONGODB CONNECTION-----//
mongoose
  .connect(MONGO)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.error(`Connection failed ${error}`);
  });

//-----CLOUDINARY CONNECTION-----//
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server started on port Number : ${PORT}`);
});
