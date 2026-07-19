import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { getDashboardStats } from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboardStats
);

export default router;