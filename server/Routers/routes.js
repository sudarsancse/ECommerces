import express from "express";
import { LoginUser, RegisterUser, AdminLogin } from "../Controls/user.js";

const routes = express.Router();

//----Route for Register user-----//
routes.post("/register", RegisterUser);

//----Route for login -user-----//
routes.post("/login", LoginUser);

// TODOs ----Route for Admin login -----//
routes.post("/admin", AdminLogin);

export default routes;
