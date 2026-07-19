import { useCart } from "../context/CartContext";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_CHARGE } from "../config/StoreConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateCoupon } from "../services/couponService";
import { useCoupon } from "../context/CouponContext";
import toast from "react-hot-toast";
const Cart = () => {
  const {
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = useCart();

const navigate = useNavigate();

const [couponCode, setCouponCode] = useState("");

const {
  appliedCoupon,
  discount,
  applyCoupon,
  removeCoupon,
} = useCoupon();

const subtotal = cartItems.reduce((acc, item) => {
  const price =
    item.discountPrice > 0
      ? item.discountPrice
      : item.price;

  return acc + price * item.quantity;
}, 0);

const shipping =
  subtotal >= FREE_SHIPPING_THRESHOLD
    ? 0
    : SHIPPING_CHARGE;

const total = Math.max(subtotal + shipping - discount, 0);

const applyCouponHandler = async () => {
  if (!couponCode.trim()) {
    toast.error("Enter coupon code");
    return;
  }

  try {
    const { data } = await validateCoupon({
      code: couponCode,
      orderAmount: subtotal,
    });

    applyCoupon(
  data.coupon,
  data.discount
);

    toast.success("Coupon applied successfully");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Invalid coupon"
    );
  }
};

const removeCouponHandler = () => {
  removeCoupon();

  setCouponCode("");

  toast.success("Coupon removed");
};

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="mt-4 text-gray-500">
          Add some products to continue shopping.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

  {/* Cart Items */}
  <div className="lg:col-span-2 space-y-6">

    {cartItems.map((item) => (

      <div
        key={item._id}
        className="flex items-center gap-6 border rounded-lg p-4"
      >

        <img
          src={item.images[0]?.url}
          alt={item.name}
          className="w-28 h-28 object-cover rounded-lg"
        />

        <div className="flex-1">

          <h2 className="text-xl font-semibold">
            {item.name}
          </h2>

          <p className="text-gray-500">
            {item.brand}
          </p>

          <p className="font-bold mt-2">
            $
            {item.discountPrice > 0
              ? item.discountPrice
              : item.price}
          </p>

          <div className="flex items-center gap-3 mt-3">

            <button
              onClick={() => decreaseQuantity(item._id)}
              className="w-8 h-8 rounded bg-gray-200"
            >
              -
            </button>

            <span className="font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQuantity(item._id)}
              className="w-8 h-8 rounded bg-gray-200"
            >
              +
            </button>

          </div>

          <button
            onClick={() => removeFromCart(item._id)}
            className="mt-4 text-red-600 hover:underline"
          >
            Remove
          </button>

        </div>

      </div>

    ))}

  </div>



  {/* Order Summary */}

  <div className="border rounded-lg p-6 h-fit shadow-sm">

    <h2 className="text-2xl font-bold mb-6">
      Order Summary
    </h2>

    <div className="flex justify-between mb-3">
      <span>Subtotal</span>
      <span>${subtotal.toFixed(2)}</span>
    </div>

    <div className="flex justify-between mb-3">
      <span>Shipping</span>
      <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
    </div>

{discount > 0 && (
  <div className="flex justify-between mb-3 text-green-600">
    <span>Discount</span>

    <span>
      -${discount.toFixed(2)}
    </span>
  </div>
)}
    <hr className="my-4" />

    <div className="flex justify-between text-xl font-bold">
      <span>Total</span>
      <span>${total.toFixed(2)}</span>
    </div>

    <input
  type="text"
  value={couponCode}
  onChange={(e) =>
    setCouponCode(
      e.target.value.toUpperCase()
    )
  }
  placeholder="Coupon Code"
  disabled={!!appliedCoupon}
  className="w-full border rounded-lg p-3 mt-6"
/>

    <button
  type="button"
  onClick={
    appliedCoupon
      ? removeCouponHandler
      : applyCouponHandler
  }
  className={`w-full mt-4 py-3 rounded-lg text-white ${
    appliedCoupon
      ? "bg-red-600 hover:bg-red-700"
      : "bg-gray-800 hover:bg-black"
  }`}
>
  {appliedCoupon
    ? "Remove Coupon"
    : "Apply Coupon"}
</button>

{appliedCoupon && (
  <div className="mt-3 rounded-lg bg-green-50 border border-green-200 p-3">
    <p className="text-green-700 font-medium">
      Coupon "{appliedCoupon.code}" applied successfully.
    </p>

    <p className="text-green-600 text-sm mt-1">
      You saved ${discount.toFixed(2)}
    </p>
  </div>
)}

    <button
  onClick={() =>
  navigate("/checkout", {
    state: {
      appliedCoupon,
      discount,
    },
  })
}
  className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
>
  Proceed to Checkout
</button>

  </div>

</div>



    </div>
  );
};

export default Cart;