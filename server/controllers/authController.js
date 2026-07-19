import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = asyncHandler(
  async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill all fields");
    }

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      res.status(400);
      throw new Error(
        "User already exists"
      );
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
);

export const loginUser = asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    }).select("+password");

    if (
      user &&
      (await user.matchPassword(password))
    ) {
      res.json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(401);
      throw new Error(
        "Invalid email or password"
      );
    }
  }
);

export const getMe = asyncHandler(
  async (req, res) => {
    const user = await User.findById(
      req.user._id
    );

    res.json(user);
  }
);

export const logoutUser = asyncHandler(
  async (req, res) => {
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  }
);