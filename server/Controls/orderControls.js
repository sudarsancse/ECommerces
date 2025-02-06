import OrderModel from "../Models/orderModel.js";
import User from "../Models/userData.js";
import Razorpay from "razorpay";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

//!----------global varible------------
const currency = "inr";
const deliveryCharge = 10;

//todo --------------gatway initalize-----------
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

//? ------------------COD method------------------
export const plaseOrderCod = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
    } = address;

    if (!firstName) {
      return res.json({
        success: false,
        message: "First Name is required",
      });
    }
    if (!lastName) {
      return res.json({
        success: false,
        message: "Last Name is required",
      });
    }
    if (!email || !email.includes("@")) {
      return res.json({
        success: false,
        message: "Valid email address is required",
      });
    }
    if (!street) {
      return res.json({
        success: false,
        message: "Street is required",
      });
    }
    if (!city) {
      return res.json({
        success: false,
        message: "City is required",
      });
    }
    if (!state) {
      return res.json({
        success: false,
        message: "State is required",
      });
    }
    if (!zipcode || !/^\d{6,}$/.test(zipcode)) {
      return res.json({
        success: false,
        message: "Zipcode should be a number with at least 6 digits",
      });
    }
    if (!country) {
      return res.json({
        success: false,
        message: "country is required",
      });
    }

    if (!phone || !/^\d{10,}$/.test(phone)) {
      return res.json({
        success: false,
        message: "Phone number should be exactly 10 digits",
      });
    }

    const orderData = {
      userId,
      items,
      amount,
      address: {
        firstName,
        lastName,
        email,
        street,
        city,
        state,
        zipcode,
        country,
        phone,
      },
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
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new OrderModel(orderData);
    await newOrder.save();
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?seccess=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?seccess=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({
      success: true,
      session_url: session.url,
    });
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
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({
          success: false,
          message: error,
        });
      }
      res.json({
        success: true,
        order,
      });
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//* -------------------verify Razorpay method--------------------
export const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await OrderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.json({
        success: true,
        message: "Payment Successfull",
      });
    } else {
      res.json({
        success: false,
        message: "Payment Failed",
      });
    }
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
    const orders = await OrderModel.find({});
    res.json({
      success: true,
      orders,
    });
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
    const { userId } = req.body;

    const orders = await OrderModel.find({ userId });
    res.json({
      success: true,
      orders,
    });
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
    const { orderId, status } = req.body;
    await OrderModel.findByIdAndUpdate(orderId, { status });
    res.json({
      success: true,
      status,
      message: `Status successfully updated to ${status}`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
