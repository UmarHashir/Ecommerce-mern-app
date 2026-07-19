import express from "express";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.use(protect);

router.get("/", getWishlist);

router.post("/:id", addToWishlist);

router.delete("/:id", removeFromWishlist);

export default router;