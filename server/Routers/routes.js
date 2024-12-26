import express from "express";
import {
  LoginUser,
  RegisterUser,
  AdminLogin,
  AdminSignup,
  ListUsers,
  sendOTP,
  VerifyOTP,
  UpdatedPassword,
} from "../Controls/user.js";

const routes = express.Router();

//----Route for Register user-----//
routes.post("/register", RegisterUser);

//----Route for login -user-----//
routes.post("/login", LoginUser);

//----Route for otp send-----//
routes.post("/send-otp", sendOTP);

//----Route for otp send-----//
routes.post("/verify-otp", VerifyOTP);

//?----Route for UpdatedPassword -----//
routes.post("/updated-password/:id", UpdatedPassword);

// TODOs ----Route for Admin login -----//
routes.post("/admin", AdminLogin);

//! ----Route for Admin signup -----//
routes.post("/adminSignup", AdminSignup);

// TODOs ----Route for Admin login -----//
routes.get("/listUsers", ListUsers);

export default routes;
