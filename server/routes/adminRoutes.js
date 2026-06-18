import express from "express";

import {
  adminSignup,
  verifyOTP,
  adminLogin,
} from "../controllers/adminController.js";

import {
  getDashboardStats,
   getMonthlyRevenue,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/verify-otp", verifyOTP);
router.post("/login", adminLogin);

router.get(
    "/dashboard-stats",
    getDashboardStats
);

router.get(
    "/monthly-revenue",
    getMonthlyRevenue
);

export default router;