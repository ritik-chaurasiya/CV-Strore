import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: "",
    },
    googleId: {
      type: String,
      default: "",
    },
     profilePhoto: {
      type: String,
      default: "",
    },

    profilePhotoId: {
      type: String,
      default: "",
    },
    
    // Forgot Password

    resetOTP: {
      type: String,
      default: "",
    },

    resetOTPExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);


