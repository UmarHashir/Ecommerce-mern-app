import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getNewArrivals,
  getRelatedProducts,
  createProductReview
} from "../controllers/productController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    protect,
    authorize("admin"),
    upload.array("images", 5),
    createProduct
  );

  router.get(
  "/featured",
  getFeaturedProducts
);

router.get(
  "/new-arrivals",
  getNewArrivals
);
router.post(
  "/:id/reviews",
  protect,
  createProductReview
);
router.get(
  "/related/:id",
  getRelatedProducts
);
router
  .route("/:id")
  .get(getProduct)
  .put(
  protect,
  authorize("admin"),
  upload.array("images", 5),
  updateProduct
)
  .delete(
    protect,
    authorize("admin"),
    deleteProduct
  );

export default router;