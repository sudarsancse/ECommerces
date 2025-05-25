import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: { type: Object, default: {} },
    address: { type: Object, default: {} },
  },
  { minimize: false },
  { timestamps: true }
);

const User = mongoose.model("userData", UserSchema);

export default User;
