import User from "../models/AdminUser.js";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import transporter from "../config/mail.js";
import jwt from "jsonwebtoken";


//Admin Signup (Send OTP)

export const adminSignup = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });

  if (existing) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
    otp,
    otpExpiry: Date.now() + 5 * 60 * 1000,
  });

  await transporter.sendMail({
  from: `"CV Admin Team" <${process.env.EMAIL}>`,
  to: email,
  subject: "Verify Your Email Address",
  html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 10px;">
    
    <div style="text-align: center;">
      <h1 style="color: #2563eb;">CV Admin Panel</h1>
    </div>

    <h2>Email Verification</h2>

    <p>Hello <strong>${name}</strong>,</p>

    <p>
      Thank you for registering. Please use the verification code below to verify your email address.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <h1 style="
        background: #f3f4f6;
        padding: 15px;
        border-radius: 8px;
        letter-spacing: 5px;
        color: #2563eb;
      ">
        ${otp}
      </h1>
    </div>

    <p>
      This OTP is valid for <strong>5 minutes</strong>.
    </p>

    <p>
      If you did not create this account, please ignore this email.
    </p>

    <hr />

    <p style="font-size: 12px; color: #6b7280;">
      This is an automated email. Please do not reply.
    </p>

    <p style="font-size: 12px; color: #6b7280;">
      © 2026 CV Admin Panel. All rights reserved.
    </p>

  </div>
  `,
});

  res.json({
    success: true,
    message: "OTP Sent Successfully",
  });
};


// Verify OTP

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (
    user.otp !== otp ||
    user.otpExpiry < Date.now()
  ) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  res.json({
    success: true,
    message: "Email Verified",
  });
};


// Admin Login

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email });

  if (!admin) {
    return res.status(404).json({
      message: "Admin not found",
    });
  }

  if (!admin.isVerified) {
    return res.status(400).json({
      message: "Verify Email First",
    });
  }

  const match = await bcrypt.compare(
    password,
    admin.password
  );

  if (!match) {
    return res.status(400).json({
      message: "Wrong Password",
    });
  }

  const token = jwt.sign(
    {
      _id: admin._id,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.json({
    token,
    role: admin.role,
  });
};