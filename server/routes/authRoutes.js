import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "../config/passport.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    // Check if body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
  {
    userId: user._id,
    name: user.name,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

    // Success response
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Google Login

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
    }),

    async (req, res) => {

        const token = jwt.sign(
            {
                userId: req.user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.redirect(
            `http://localhost:5173/google-success?token=${token}`
        );
    }
);

// Forgot password

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

router.post(
    "/forgot-password",
    async (req, res) => {

        try {

            const { email } = req.body;

            const user =
                await User.findOne({
                    email,
                });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message:
                        "User not found",
                });
            }

            const otp =
                Math.floor(
                    100000 +
                    Math.random() * 900000
                ).toString();

            user.resetOTP = otp;

            user.resetOTPExpire =
                Date.now() +
                10 * 60 * 1000;

            await user.save();

            await transporter.sendMail({
                from:
                    process.env.EMAIL,
                to: email,
                subject:
                    "Password Reset OTP",
                html: `
     
                  <div style="
                      font-family: Arial, sans-serif;
                      max-width: 600px;
                      margin: auto;
                      background: #ffffff;
                      border-radius: 12px;
                      overflow: hidden;
                      border: 1px solid #e5e7eb;
                  ">
                  <div style="
                      background: linear-gradient(135deg,#210944,#08264c);
                      color: white;
                      padding: 25px;
                      text-align: center;
                  ">
                      <h1 style="margin:0;">
                          CV Store
                      </h1>
                      <p style="margin-top:10px;">
                          Password Reset Request
                      </p>
                  </div>
                  
                  <div style="padding:30px;">
                  
                      <h2 style="color:#210944;">
                          Hello,
                      </h2>
                  
                      <p style="
                          color:#555;
                          line-height:1.8;
                      ">
                          We received a request to reset the password for your CV Store account.
                          Please use the verification code below to continue.
                      </p>
                  
                      <div style="
                          text-align:center;
                          margin:30px 0;
                      ">
                  
                          <span style="
                              display:inline-block;
                              padding:15px 35px;
                              font-size:32px;
                              font-weight:bold;
                              letter-spacing:8px;
                              color:#210944;
                              background:#f3f4f6;
                              border-radius:10px;
                          ">
                              ${otp}
                          </span>
                  
                      </div>
                  
                      <p style="
                          color:#555;
                          line-height:1.8;
                      ">
                          This OTP is valid for
                          <strong>10 minutes</strong>.
                          Please do not share this code with anyone.
                      </p>
                  
                      <p style="
                          color:#555;
                          line-height:1.8;
                      ">
                          If you did not request a password reset,
                          you can safely ignore this email.
                      </p>
                  
                      <hr style="
                          margin:25px 0;
                          border:none;
                          border-top:1px solid #e5e7eb;
                      ">
                  
                      <p style="
                          text-align:center;
                          color:#888;
                          font-size:13px;
                      ">
                          © ${new Date().getFullYear()} CV Store
                          <br>
                          Secure Shopping Platform
                      </p>
                  
                  </div>
                  
                  </div>
                `,

            });

            res.json({
                success: true,
                message:
                    "OTP sent successfully",
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message,
            });

        }

    }
);

// Verify OTP Route

router.post(
    "/verify-reset-otp",
    async (req, res) => {

        try {

            const {
                email,
                otp,
            } = req.body;

            const user =
                await User.findOne({
                    email,
                });

            if (
                !user ||
                user.resetOTP !== otp ||
                user.resetOTPExpire < Date.now()
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid or Expired OTP",
                });
            }

            res.status(200).json({
                success: true,
                message:
                    "OTP Verified Successfully",
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message,
            });

        }

    }
);

//Reset Password Route

router.post(
    "/reset-password",
    async (req, res) => {

        const {
         email,
         otp,
         password,
         } = req.body;

        const user =
            await User.findOne({
                email,
            });

        if (!user) {
            return res.status(404).json({
                success: false,
                message:
                    "User not found",
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        user.password =
            hashedPassword;

        user.resetOTP = "";

        await user.save();

        res.json({
            success: true,
            message:
                "Password Reset Successful",
        });

    }
);

export default router;