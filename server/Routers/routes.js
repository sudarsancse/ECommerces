import express from "express";
import { UserData } from "../Controls/user.js";

const routes = express.Router();

routes.post("/data", UserData);

export default routes;
