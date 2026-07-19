import asyncHandler from "express-async-handler";
import Coupon from "../models/Coupon.js";

export const createCoupon =
  asyncHandler(async (req, res) => {
    const coupon =
      await Coupon.create(req.body);

    res.status(201).json({
      success: true,
      coupon,
    });
  });

export const getCoupons =
  asyncHandler(async (req, res) => {
    const coupons =
      await Coupon.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      coupons,
    });
  });

  // Get Single Coupon
export const getCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }

  res.json({
    success: true,
    coupon,
  });
});

// Update Coupon
export const updateCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }

  Object.assign(coupon, req.body);

  await coupon.save();

  res.json({
    success: true,
    coupon,
    message: "Coupon updated successfully",
  });
});

// Delete Coupon
export const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }

  await coupon.deleteOne();

  res.json({
    success: true,
    message: "Coupon deleted successfully",
  });
});
export const validateCoupon = asyncHandler(async (req, res) => {
  const { code, orderAmount } = req.body;

  if (!code) {
    res.status(400);
    throw new Error("Coupon code is required");
  }

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
  });

  if (!coupon) {
    res.status(404);
    throw new Error("Invalid coupon code");
  }

  if (!coupon.isActive) {
    res.status(400);
    throw new Error("Coupon is inactive");
  }

  if (coupon.expiresAt < new Date()) {
    res.status(400);
    throw new Error("Coupon has expired");
  }

  if (coupon.usedCount >= coupon.usageLimit) {
    res.status(400);
    throw new Error("Coupon usage limit reached");
  }

  if (orderAmount < coupon.minimumOrder) {
    res.status(400);
    throw new Error(
      `Minimum order amount is $${coupon.minimumOrder}`
    );
  }

  let discount = 0;

  if (coupon.discountType === "percentage") {
    discount =
      (orderAmount * coupon.discountValue) / 100;
  } else {
    discount = coupon.discountValue;
  }

  // Prevent discount exceeding order amount
  discount = Math.min(discount, orderAmount);

  res.json({
    success: true,
    coupon: {
      _id: coupon._id,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
    },
    discount,
    finalAmount: orderAmount - discount,
  });
});