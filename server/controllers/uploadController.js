import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Please select an image");
  }

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "mern-ecommerce/products",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });

  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
});