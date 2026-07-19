import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { createOrder } from "../services/orderService";

import { useCart } from "../context/CartContext";
import { useCoupon } from "../context/CouponContext";
import { createPaymentIntent } from "../services/paymentService";

const ReviewOrder = () => {
  const { cartItems, clearCart } = useCart();
  const {
  appliedCoupon,
  discount,
  removeCoupon,
} = useCoupon();

const navigate = useNavigate();
const [loading, setLoading] = useState(false);

  const shippingInfo = JSON.parse(
    localStorage.getItem("shippingInfo")
  );

  const subtotal = cartItems.reduce((acc, item) => {
    const price =
      item.discountPrice > 0
        ? item.discountPrice
        : item.price;

    return acc + price * item.quantity;
  }, 0);

  const shipping = subtotal > 100 ? 0 : 10;
  const total = Math.max(
  subtotal + shipping - discount,
  0
);

  const placeOrderHandler = async () => {
  if (loading) return;

  setLoading(true);

  try {
    const orderItems = cartItems.map((item) => ({
      product: item._id,
      name: item.name,
      image: item.images[0]?.url,
      price:
        item.discountPrice > 0
          ? item.discountPrice
          : item.price,
      quantity: item.quantity,
    }));

    //console.log("Applied Coupon:", appliedCoupon);
    const { data } =
  await createPaymentIntent(total);

navigate("/payment", {
  state: {
    clientSecret: data.clientSecret,

    orderData: {
      orderItems,
      shippingInfo,
      itemsPrice: subtotal,
      shippingPrice: shipping,
      coupon: appliedCoupon,
    },
  },
});
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to create payment"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">
        Review Your Order
      </h1>

      {/* Shipping Info */}

      <div className="border rounded-lg p-5 mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Shipping Address
        </h2>

        <p>{shippingInfo.fullName}</p>

        <p>{shippingInfo.phone}</p>

        <p>{shippingInfo.address}</p>

        <p>
          {shippingInfo.city}, {shippingInfo.state}
        </p>

        <p>
          {shippingInfo.postalCode}
        </p>

        <p>{shippingInfo.country}</p>

      </div>

      {/* Cart Items */}

      <div className="border rounded-lg p-5 mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Products
        </h2>

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between py-2"
          >
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>
              $
              {(item.discountPrice > 0
                ? item.discountPrice
                : item.price) * item.quantity}
            </span>
          </div>
        ))}

      </div>

      {/* Order Summary */}

      <div className="border rounded-lg p-5">

        <div className="flex justify-between mb-3">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-3">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? "Free" : `$${shipping}`}
          </span>
        </div>

        {discount > 0 && (
  <div className="flex justify-between mb-3 text-green-600">
    <span>Discount</span>

    <span>
      -${discount.toFixed(2)}
    </span>
  </div>
)}

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
  onClick={placeOrderHandler}
  disabled={loading}
  className={`w-full mt-6 py-3 rounded-lg text-white ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {loading ? "Placing Order..." : "Place Order"}
</button>

      </div>

    </div>
  );
};

export default ReviewOrder;