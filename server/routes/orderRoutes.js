import express from "express";

import {
  cancelOrder,
  createOrder,
  getOrders,
  updateOrderStatus,
  getMyOrders,
  getRevenue,
  getMonthlyRevenue, 
} from "../controllers/orderController.js";

const router = express.Router();

router.post(
  "/create",
  createOrder
);

router.get("/", getOrders);

router.put(
  "/cancel/:id",
  cancelOrder
);

router.put(
  "/:id/status",
  updateOrderStatus
);

router.get(
    "/my-orders/:userId",
    getMyOrders
);

router.get(
    "/revenue",
    getRevenue
);

router.get(
    "/monthly-revenue",
    getMonthlyRevenue
);

export default router;