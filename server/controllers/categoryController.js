import asyncHandler from "express-async-handler";
import slugify from "slugify";

import Category from "../models/Category.js";

export const createCategory = asyncHandler(
  async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400);
      throw new Error("Category name is required");
    }

    const exists = await Category.findOne({ name });

    if (exists) {
      res.status(400);
      throw new Error("Category already exists");
    }

    const category = await Category.create({
      name,
      slug: slugify(name, {
        lower: true,
      }),
    });

    res.status(201).json({
      success: true,
      category,
    });
  }
);
export const getCategories = asyncHandler(
  async (req, res) => {
    const categories =
      await Category.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      categories,
    });
  }
);

export const getCategory = asyncHandler(
  async (req, res) => {
    const category =
      await Category.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    res.json({
      success: true,
      category,
    });
  }
);

export const updateCategory =
  asyncHandler(async (req, res) => {
    const { name } = req.body;

    const category =
      await Category.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    category.name = name;

    category.slug = slugify(name, {
      lower: true,
    });

    await category.save();

    res.json({
      success: true,
      category,
    });
  });

  export const deleteCategory =
  asyncHandler(async (req, res) => {
    const category =
      await Category.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    await category.deleteOne();

    res.json({
      success: true,
      message: "Category deleted",
    });
  });