import OrderModel from "../Models/orderModel.js";
import User from "../Models/userData.js";

//? ------------------COD method------------------
export const plaseOrderCod = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//! -------------------- Stripe method-------------------

export const plaseOrderStripe = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//* -------------------Razorpay method--------------------

export const plaseOrderRazorpay = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//todo------------- All order data for Admin panel---------------------

export const allOrders = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//*----------------- All order data for clientsite-------------------------

export const userOrders = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//!------------------- Update the oredr status-------------------------------

export const updateStatus = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
