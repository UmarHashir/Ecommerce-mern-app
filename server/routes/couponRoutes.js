import express from "express";

import {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} from "../controllers/couponController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(
    protect,
    authorize("admin"),
    getCoupons
  )
  .post(
    protect,
    authorize("admin"),
    createCoupon
  );

  router.post(
  "/validate",
  protect,
  validateCoupon
);

  router
  .route("/:id")
  .get(
    protect,
    authorize("admin"),
    getCoupon
  )
  .put(
    protect,
    authorize("admin"),
    updateCoupon
  )
  .delete(
    protect,
    authorize("admin"),
    deleteCoupon
  );

  

export default router;