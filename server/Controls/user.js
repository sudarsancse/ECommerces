import User from "../Models/userData.js";
import validator from "validator";
import OTP from "../Models/OtpVarification.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminModel from "../Models/adminModel.js";
import { json } from "express";

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

//! validating ForgetPassword (send otp)
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const Email = await User.findOne({ email: email });
    if (!Email) {
      return res.json({ success: false, message: "Email id not valide" });
    }
    const id = Email._id;
    let otp = Math.floor(1000 + Math.random() * 9000);

    const otps = new OTP({
      email: email,
      Code: otp,
      expireAt: new Date(Date.now() + 120 * 1000),
      UserRef: id,
    });

    const saveData = await otps.save();

    res.json({
      success: true,
      message: "Otp send to your email id",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//! validating ForgetPassword ( VerifyOTP)
export const VerifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const data = await OTP.findOne({ email: email });
    const ID = data.UserRef;
    if (!data) {
      return res.json({ success: false, message: "Email id not valid" });
    }
    if (otp === data.Code) {
      return res.json({
        success: true,
        message: "OTP verified successfully",
        ID,
      });
    } else {
      return res.json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ?----Route for new password-----//
export const UpdatedPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;

    if (newPassword === confirmPassword) {
      const id = req.params.id;
      const user = await User.findById({ _id: id });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const salt = await bcrypt.genSalt(12);

      const hasPassword = await bcrypt.hash(confirmPassword, salt);
      user.password = hasPassword;
      await user.save();

      res.json({
        success: true,
        message: "Password Updated successfully.",
      });
    } else {
      return res.json({
        success: true,
        message: "Password not match",
      });
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

    if (!existUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (email === existUser.email && isPasswordValid) {
      /* const token = createToken(existUser._id); */
      const token = jwt.sign(
        { id: existUser._id, role: existUser.role },
        process.env.JSONWEBTOKEN,
        { expiresIn: "1h" }
      );

      const role = existUser.role;

      res.json({ success: true, token, role });
    } else {
      res.json({ success: false, message: "Invalid credential" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//! validating admin signup

export const AdminSignup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

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
      role,
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

// * function list Users (GET req)
export const ListUsers = async (req, res) => {
  try {
    const Users = await User.find({});
    res.json({ success: true, message: "All Users", Users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ! role based users ///
export const RoleUser = async (req, res) => {
  try {
    const { token } = req.headers;
    const tokenDecode = jwt.verify(token, process.env.JSONWEBTOKEN);

    const id = await adminModel.findById(tokenDecode.id);
    const loginUserDetails = {
      name: id.name,
      email: id.email,
      role: id.role,
    };

    const Users = await adminModel.find({});

    res.json({ success: true, message: "All Users", Users, loginUserDetails });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// * role based users ///
export const UpdateRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    if (!userId || !newRole) {
      return res.status(400).json({
        success: false,
        message: "User ID and new role are required",
      });
    }

    // Optionally validate role values
    const validRoles = ["admin", "manager", "user"];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role value",
      });
    }

    const user = await adminModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = newRole;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
    });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating role",
    });
  }
};
