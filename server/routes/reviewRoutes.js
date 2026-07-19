import express from "express";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  updateReview,
  deleteReview
} from "../controllers/reviewController.js";

const router = express.Router();

router.put(
  "/:productId/:reviewId",
  protect,
  updateReview
);

router.delete(
  "/:productId/:reviewId",
  protect,
  deleteReview
);

export default router;