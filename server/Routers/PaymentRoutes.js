import express from "express";
import {
  plaseOrderCod,
  plaseOrderStripe,
  plaseOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
} from "../Controls/orderControls.js";
import adminAuth from "../Middlewares/adminAuth.js";

import { authUser } from "../Middlewares/auth.js";
const PaymentRoutes = express.Router();

// * payment method
PaymentRoutes.post("/cod", authUser, plaseOrderCod);
PaymentRoutes.post("/stripe", authUser, plaseOrderStripe);
PaymentRoutes.post("/razorpay", authUser, plaseOrderRazorpay);

//! Admin Features
PaymentRoutes.post("/allOrders", adminAuth, allOrders);
PaymentRoutes.post("/status", adminAuth, updateStatus);

//Todo Client Features
PaymentRoutes.post("/userOrders", authUser, userOrders);

export default PaymentRoutes;
