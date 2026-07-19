import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// Get all users (Admin)
export const getUsers = asyncHandler(
  async (req, res) => {
    const resultPerPage = 10;

    const page =
      Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const totalUsers =
      await User.countDocuments(keyword);

    const users = await User.find(keyword)
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * resultPerPage)
      .limit(resultPerPage);

    res.json({
      success: true,
      users,
      totalUsers,
      resultPerPage,
      currentPage: page,
    });
  }
);

// Get single user
export const getUser = asyncHandler(
  async (req, res) => {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.json({
      success: true,
      user,
    });
  }
);

// Update user
export const updateUser = asyncHandler(
  async (req, res) => {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.name =
      req.body.name ?? user.name;

    user.email =
      req.body.email ?? user.email;

    user.role =
      req.body.role ?? user.role;

    await user.save();

    res.json({
      success: true,
      user,
    });
  }
);

// Delete user
export const deleteUser = asyncHandler(
  async (req, res) => {
    if (
      req.user._id.toString() === req.params.id
    ) {
      res.status(400);
      throw new Error(
        "You cannot delete your own account"
      );
    }

    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    await user.deleteOne();

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  }
);