import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const getDashboardStats = asyncHandler(
  async (req, res) => {
    const totalProducts =
      await Product.countDocuments();
      const now = new Date();
      const totalUsers =
      await User.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const revenue = await Order.aggregate([
      
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

const firstDayOfMonth = new Date(
  now.getFullYear(),
  now.getMonth(),
  1
);

const monthlyRevenue =
  await Order.aggregate([
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        revenue: {
          $sum: "$totalPrice",
        },
        orders: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  const monthlyOrders =
  await Order.countDocuments({
    createdAt: {
      $gte: firstDayOfMonth,
    },
  });

  const newUsers =
  await User.countDocuments({
    createdAt: {
      $gte: firstDayOfMonth,
    },
  });

  const averageOrderValue =
  totalOrders > 0
    ? (
        (revenue[0]?.totalRevenue || 0) /
        totalOrders
      ).toFixed(2)
    : 0;

    

    const lowStockProducts =
      await Product.find({
        stock: {
          $lte: 5,
        },
      })
        .select("name stock")
        .limit(5);

    const recentOrders =
      await Order.find()
        .populate("user", "name")
        .sort({
          createdAt: -1,
        })
        .limit(5);


        const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthlyAnalytics =
  monthlyRevenue.map((item) => ({
    month:
      months[item._id.month - 1],
    revenue: item.revenue,
    orders: item.orders,
  }));

  const orderStatusData =
  await Order.aggregate([
    {
      $group: {
        _id: "$orderStatus",

        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const orderStatusAnalytics =
  orderStatusData.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  const topSellingProducts =
  await Product.find()
    .sort({ sold: -1 })
    .select(
      "name sold stock price images"
    )
    .limit(5);

    res.json({
      success: true,

      stats: {
  totalProducts,
  totalUsers,
  totalOrders,
  monthlyAnalytics,
  orderStatusAnalytics,
  topSellingProducts,
  totalRevenue:
    revenue[0]?.totalRevenue || 0,

  monthlyRevenue:
    monthlyRevenue[0]?.revenue || 0,

  monthlyOrders,

  newUsers,

  averageOrderValue,
},

      lowStockProducts,

      recentOrders,
      
    });
  }
);

