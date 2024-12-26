import mongoose from "mongoose";

const OtpVarification = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    Code: {
      type: String,
      require: true,
    },
    expireAt: {
      type: Date,
      required: true,
      index: { expires: "2m" },
    },
    UserRef: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const OTP = mongoose.model("OTP", OtpVarification);

export default OTP;
