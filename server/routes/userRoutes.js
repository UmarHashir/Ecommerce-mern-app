import express from "express";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.use(
  protect,
  authorize("admin")
);

router
  .route("/")
  .get(getUsers);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;