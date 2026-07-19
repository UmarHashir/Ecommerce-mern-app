import Order from "../models/Order.js";
import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import Coupon from "../models/Coupon.js"
import stripe from "../config/stripe.js";
import { sendEmail,sendOrderConfirmationEmail } from "../services/emailService.js";
import {
  sendOrderShippedEmail,
  sendOrderDeliveredEmail,
} from "../services/emailService.js";
import generateInvoice from "../utils/invoiceGenerator.js";
import User from "../models/User.js";

import orderConfirmationTemplate
from "../templates/orderConfirmation.js";
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    shippingPrice,
    coupon,
  } = req.body;

  // Check stock
  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (!product) {
      res.status(404);
      throw new Error(`Product not found`);
    }

    if (product.stock < item.quantity) {
      res.status(400);
      throw new Error(
        `${product.name} has only ${product.stock} item(s) left in stock`
      );
    }
  }

  

  let appliedCoupon = null;
let discountAmount = 0;

//validate coupon
if (coupon?.code) {
  appliedCoupon = await Coupon.findOne({
    code: coupon.code.toUpperCase(),
  });

  if (!appliedCoupon) {
    res.status(400);
    throw new Error("Invalid coupon");
  }

  if (!appliedCoupon.isActive) {
    res.status(400);
    throw new Error("Coupon is inactive");
  }

  if (appliedCoupon.expiresAt < new Date()) {
    res.status(400);
    throw new Error("Coupon has expired");
  }

  if (
    appliedCoupon.usedCount >=
    appliedCoupon.usageLimit
  ) {
    res.status(400);
    throw new Error("Coupon usage limit reached");
  }

  if (
    itemsPrice <
    appliedCoupon.minimumOrder
  ) {
    res.status(400);
    throw new Error(
      `Minimum order amount is $${appliedCoupon.minimumOrder}`
    );
  }

  if (
    appliedCoupon.discountType === "percentage"
  ) {
    discountAmount =
      (itemsPrice *
        appliedCoupon.discountValue) /
      100;
  } else {
    discountAmount =
      appliedCoupon.discountValue;
  }

  discountAmount = Math.min(
    discountAmount,
    itemsPrice
  );
}

// Update stock & sold count
  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    product.stock -= item.quantity;
    product.sold += item.quantity;

    await product.save();
  }

// NOW calculate total
const finalTotal = Math.max(
  itemsPrice +
    shippingPrice -
    discountAmount,
  0
);

//Extra Validation
const stripeAmount =
  paymentIntent.amount / 100;

if (
  Math.abs(
    stripeAmount - finalTotal
  ) > 0.01
) {
  res.status(400);
  throw new Error(
    "Payment amount mismatch"
  );
}


//Verify Payment
const paymentIntent =
  await stripe.paymentIntents.retrieve(
    paymentIntentId
  );

if (
  paymentIntent.status !== "succeeded"
) {
  res.status(400);
  throw new Error(
    "Payment verification failed"
  );
}

// Prevent Duplicate Orders
const existingOrder =
  await Order.findOne({
    "paymentInfo.id":
      paymentIntent.id,
  });

if (existingOrder) {
  res.status(400);
  throw new Error(
    "Order already exists for this payment."
  );
}

  // Create order
  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingInfo,
    itemsPrice,
    shippingPrice,
    totalPrice: finalTotal,
    paymentInfo: {
  id: paymentIntentId,
  status: paymentIntent.status,
},

isPaid: true,

paidAt: new Date(),
    coupon: appliedCoupon
  ? {
      code: appliedCoupon.code,
      discountType:
        appliedCoupon.discountType,
      discountValue:
        appliedCoupon.discountValue,
      discountAmount,
    }
  : undefined,
  });

  const user = req.user;

await sendOrderConfirmationEmail(
  req.user,
  order
);

  if (appliedCoupon) {
  appliedCoupon.usedCount += 1;

  await appliedCoupon.save();
}

  res.status(201).json({
    success: true,
    order,
  });
});

export const getMyOrders = asyncHandler(
  async (req, res) => {
    const orders = await Order.find({
      user: req.user._id,
    })
      .sort("-createdAt")
      .populate(
        "orderItems.product",
        "name images slug"
      );

    res.json({
      success: true,
      orders,
    });
  }
);

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json({
    success: true,
    order,
  });
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  );

  res.json({
    success: true,
    totalOrders: orders.length,
    totalRevenue,
    orders,
  });
});
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

if (!order) {
  res.status(404);
  throw new Error("Order not found");
}

if (order.isDelivered) {
  res.status(400);
  throw new Error("Order already delivered");
}

  order.orderStatus = req.body.orderStatus;

  if (req.body.orderStatus === "Delivered") {
    order.isDelivered = true;
    order.deliveredAt = new Date();
  }

  await order.save();
  const customer = await User.findById(
  order.user
);

if (
  order.orderStatus === "Shipped"
) {
  await sendOrderShippedEmail(
    customer,
    order
  );
}

if (
  order.orderStatus === "Delivered"
) {
  await sendOrderDeliveredEmail(
    customer,
    order
  );
}

  res.json({
    success: true,
    message: "Order status updated",
    order,
  });
});

export const downloadInvoice = asyncHandler(
  async (req, res) => {
    const order = await Order.findById(
      req.params.id
    )
      .populate("user", "name email")
      .populate(
        "orderItems.product",
        "name"
      );

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    // Customer can access only their own invoice
    // Admin can access every invoice

    if (
      req.user.role !== "admin" &&
      order.user._id.toString() !==
        req.user._id.toString()
    ) {
      res.status(403);
      throw new Error(
        "Not authorized to download this invoice"
      );
    }

    generateInvoice(order, res);
  }
);