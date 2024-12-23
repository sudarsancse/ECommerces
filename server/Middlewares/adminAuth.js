import jwt from "jsonwebtoken";
import AdminModel from "../Models/adminModel.js";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Not Authorized User " });
    }

    const tokenDecode = jwt.verify(token, process.env.JSONWEBTOKEN);

    const admin = await AdminModel.findById(tokenDecode.id);

    if (tokenDecode.id !== admin._id.toString()) {
      return res.json({ success: false, message: "Not Authorized User" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
