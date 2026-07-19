import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const getWishlist = asyncHandler(
  async (req, res) => {
    const user = await User.findById(
      req.user._id
    ).populate("wishlist");

    res.json({
      success: true,
      wishlist: user.wishlist,
    });
  }
);

export const addToWishlist =
  asyncHandler(async (req, res) => {
    const user = await User.findById(
      req.user._id
    );

    if (
      !user.wishlist.includes(req.params.id)
    ) {
      user.wishlist.push(req.params.id);

      await user.save();
    }

    res.json({
      success: true,
      message: "Added to wishlist",
    });
  });

export const removeFromWishlist =
  asyncHandler(async (req, res) => {
    const user = await User.findById(
      req.user._id
    );

    user.wishlist =
      user.wishlist.filter(
        (item) =>
          item.toString() !== req.params.id
      );

    await user.save();

    res.json({
      success: true,
      message: "Removed from wishlist",
    });
  });