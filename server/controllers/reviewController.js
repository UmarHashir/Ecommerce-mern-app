import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

export const updateReview = asyncHandler(
  async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(
      req.params.productId
    );

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const review = product.reviews.id(
      req.params.reviewId
    );

    if (!review) {
      res.status(404);
      throw new Error("Review not found");
    }

    if (
      review.user.toString() !==
      req.user._id.toString()
    ) {
      res.status(403);
      throw new Error("Unauthorized");
    }

    review.rating = Number(rating);
    review.comment = comment;

    product.rating =
      product.reviews.reduce(
        (acc, item) => acc + item.rating,
        0
      ) / product.reviews.length;

    await product.save();

    res.json({
      success: true,
      message: "Review updated",
    });
  }
);

export const deleteReview = asyncHandler(
  async (req, res) => {
    const product = await Product.findById(
      req.params.productId
    );

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const review = product.reviews.id(
      req.params.reviewId
    );

    if (!review) {
      res.status(404);
      throw new Error("Review not found");
    }

    if (
      review.user.toString() !==
      req.user._id.toString()
    ) {
      res.status(403);
      throw new Error("Unauthorized");
    }

    // Remove review
    review.deleteOne();

    // Recalculate values
    product.numReviews =
      product.reviews.length;

    product.rating =
      product.numReviews === 0
        ? 0
        : product.reviews.reduce(
            (acc, item) =>
              acc + item.rating,
            0
          ) / product.numReviews;

    await product.save();

    res.json({
      success: true,
      message: "Review deleted",
    });
  }
);