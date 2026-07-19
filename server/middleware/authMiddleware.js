import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const protect = asyncHandler(
  async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      token =
        req.headers.authorization.split(
          " "
        )[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await User.findById(
        decoded.id
      ).select("-password");

      next();
    } else {
      res.status(401);
      throw new Error(
        "Not authorized"
      );
    }
  }
);

// export const admin = (
//   req,
//   res,
//   next
// ) => {
//   if (req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403);
//     throw new Error(
//       "Admin only"
//     );
//   }
// };

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Access denied");
    }

    next();
  };
};