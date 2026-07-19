import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        name: String,

        image: String,

        price: Number,

        quantity: Number,
      },
    ],

    shippingInfo: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },

    coupon: {
  code: String,
  discountType: {
    type: String,
    enum: ["percentage", "fixed"],
  },
  discountValue: Number,
  discountAmount: {
    type: Number,
    default: 0,
  },
},

    itemsPrice: {
      type: Number,
      required: true,
    },

    shippingPrice: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: [
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Processing",
    },

  paymentInfo: {
  id: String,
  status: String,
},
  isPaid: {
      type: Boolean,
      default: false,
    },
  paidAt: Date,

  isDelivered: {
  type: Boolean,
  default: false,
},
   deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);