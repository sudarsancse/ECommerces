import User from "../Models/userData.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminModel from "../Models/adminModel.js";

// ----- jwt token -----/

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JSONWEBTOKEN);
};

//----Route for Register user-----//

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;

    /* console.log(req.body); */

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.json({ success: false, message: "User already Exists" });
    }

    //! validating email format & password

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    if (password.length < 8) {
      res.json({ success: false, message: "Please enter a strong password!" });
    }

    //? password hasing

    const salt = await bcrypt.genSalt(12);

    const hasPassword = await bcrypt.hash(password, salt);

    //? ---------------new user-------------//

    const newUser = new User({
      name,
      email,
      number,
      password: hasPassword,
    });

    // ------ save user to database---- -/

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
      success: true,
      message: "User created sucessfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//----Route for login -user-----//
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const query = isEmail ? { email: email } : { number: Number(email) };
    const user = await User.findOne(query);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: " invalid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// TODOs ----Route for Admin login -----//
export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await adminModel.findOne({ email });
    //const existUser = await adminModel.findOne({ email });
    //console.log(existUser);

    if (!existUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (email === existUser.email && isPasswordValid) {
      const token = createToken(existUser._id);

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credential" });
    }

    /* if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email, password }, process.env.JSONWEBTOKEN);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credential" });
    } */
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//! validating admin signup

export const AdminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await adminModel.findOne({ email });

    if (existUser) {
      return res.json({ success: false, message: "User already Exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    const salt = await bcrypt.genSalt(12);

    const hasPassword = await bcrypt.hash(password, salt);

    const newUser = new adminModel({
      name,
      email,
      password: hasPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
      success: true,
      message: "User created sucessfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
