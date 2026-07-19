import express from "express";
import { protect,authorize } from "../middleware/authMiddleware.js";
import { createOrder, getMyOrders,getOrderById,getAllOrders,updateOrderStatus } from "../controllers/orderController.js";
import {
  downloadInvoice,
} from "../controllers/orderController.js";
const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAllOrders
);

router.put(
  "/admin/:id",
  protect,
  authorize("admin"),
  updateOrderStatus
);
router.get(
  "/:id/invoice",
  protect,
  downloadInvoice
);
router.get("/:id", protect, getOrderById);
export default router;