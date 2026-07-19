import asyncHandler from "express-async-handler";
import slugify from "slugify";

import Product from "../models/Product.js";
import Category from "../models/Category.js";

import ApiFeatures from "../utils/ApiFeatures.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    brand,
    category,
    discountPrice,
    featured,
    bestSeller,
  } = req.body;

  if (!name || !description || !price || !stock || !category) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const existingProduct = await Product.findOne({ name });

  if (existingProduct) {
    res.status(400);
    throw new Error("Product already exists");
  }

  const categoryExists = await Category.findById(category);

  if (!categoryExists) {
    res.status(404);
    throw new Error("Category not found");
  }

   // Upload images to Cloudinary
  const uploadedImages = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await uploadToCloudinary(
        file.buffer,
        "products"
      );

      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }
  const product = await Product.create({
    name,
    slug: slugify(name, { lower: true }),
    description,
    price,
    stock,
    brand,
    category,
    discountPrice,
    featured,
    bestSeller,
    images: uploadedImages,
  });

  res.status(201).json({
    success: true,
    product,
  });
});
export const getProducts = asyncHandler(async (req, res) => {

  const resultPerPage = 3;

  const totalProducts = await Product.countDocuments({
    isActive: true,
  });

  const apiFeatures = new ApiFeatures(
    Product.find({ isActive: true }).populate("category"),
    req.query
  )
    .search()
    .filterCategory()
    .filterBrand()
    .filterPrice()
    .sort()
    .paginate(resultPerPage);

  const products = await apiFeatures.query;

  res.json({
  success: true,
  totalProducts,
  resultPerPage,
  currentPage: Number(req.query.page) || 1,
  totalPages: Math.ceil(
    totalProducts / resultPerPage
  ),
  products,
});

});

export const getProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)
    .populate("category");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({
    success: true,
    product,
  });

});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;
  product.discountPrice = req.body.discountPrice;
  product.stock = req.body.stock;
  product.brand = req.body.brand;
  product.category = req.body.category;
  product.featured = req.body.featured;
  product.bestSeller = req.body.bestSeller;

  product.slug = slugify(req.body.name, {
    lower: true,
  });

  if (req.files && req.files.length > 0) {
    const uploadedImages = [];

    for (const file of req.files) {
      const result = await uploadToCloudinary(
        file.buffer,
        "products"
      );

      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    product.images = uploadedImages;
  }

  await product.save();

  res.json({
    success: true,
    product,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();

  res.json({
    success: true,
    message: "Product deleted",
  });

});
export const getFeaturedProducts = asyncHandler(async (req, res) => {

  const products = await Product.find({
    featured: true,
    isActive: true,
  }).limit(8);

  res.json({
    success: true,
    products,
  });

});

export const getNewArrivals = asyncHandler(async (req, res) => {

  const products = await Product.find({
    isActive: true,
  })
    .sort("-createdAt")
    .limit(8);

  res.json({
    success: true,
    products,
  });

});

export const getRelatedProducts = asyncHandler(async (req, res) => {

  const product = await Product.findById(
    req.params.id
  );

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
    isActive: true,
  }).limit(4);

  res.json({
    success: true,
    products: related,
  });

});
export const createProductReview =
  asyncHandler(async (req, res) => {
    const {
      rating,
      comment,
    } = req.body;

    const product =
      await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error(
        "Product not found"
      );
    }

    const alreadyReviewed =
      product.reviews.find(
        (review) =>
          review.user.toString() ===
          req.user._id.toString()
      );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error(
        "You already reviewed this product"
      );
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    product.numReviews =
      product.reviews.length;

    product.rating =
      product.reviews.reduce(
        (acc, item) =>
          item.rating + acc,
        0
      ) / product.reviews.length;

    await product.save();

    res.json({
      success: true,
      message: "Review added",
    });
  });