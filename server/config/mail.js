import dotenv from "dotenv";
dotenv.config();
// console.log("ENV EMAIL:", process.env.EMAIL);
// console.log("EMAIL_PASSWORD =", process.env.EMAIL_PASSWORD);

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;