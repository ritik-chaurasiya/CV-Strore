import express from "express";
import upload from "../middleware/upload.js";
import {
    isAuthenticated
} from "../middleware/authMiddleware.js";

import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  addReview,
} from "../controllers/productController.js";

const router = express.Router();

router.post(
  "/create",
  upload.single("image"),
  createProduct
);

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.post(
    "/:id/review",
    isAuthenticated,
    addReview
);

export default router;