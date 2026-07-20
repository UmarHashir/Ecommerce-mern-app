import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorMiddleware.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import helmet from "helmet";


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ecommerce-mern-app-liard.vercel.app",
    ],
    credentials: true,
  })
);

app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use(
  "/api/wishlist",
  wishlistRoutes
);
app.use(
  "/api/coupons",
  couponRoutes
);
app.use("/api/payments", paymentRoutes);
app.use("/api/cart", cartRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce API Running..."
  });
});

// 404
app.use(notFound);

// Error Handler
app.use(errorHandler);



export default app;