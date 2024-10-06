import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import routes from "./Routers/routes.js";

const MONGO = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

const app = express();
mongoose
  .connect(MONGO)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.error(`Connection failed ${error}`);
  });

app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server started on port Number : ${PORT}`);
});

//WzDCSNX08fnEImED
