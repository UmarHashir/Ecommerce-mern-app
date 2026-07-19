import asyncHandler from "express-async-handler";
import stripe from "../config/stripe.js";

export const createPaymentIntent = asyncHandler(
  async (req, res) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      res.status(400);
      throw new Error("Invalid payment amount");
    }

    const paymentIntent =
      await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

    res.json({
      success: true,
      clientSecret:
        paymentIntent.client_secret,
    });
  }
);