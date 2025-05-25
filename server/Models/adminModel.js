import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "manager", "user"],
    },
    /* referralCode: {
      type: Number,
      required: true,
    }, */
  },
  { timestamps: true }
);

const adminModel = mongoose.model("admindata", AdminSchema);

export default adminModel;
