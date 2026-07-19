import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createOrder } from "../../services/orderService";
import { useCart } from "../../context/CartContext";
import { useCoupon } from "../../context/CouponContext";
import toast from "react-hot-toast";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();
  const location = useLocation();

  const { clearCart } = useCart();

const { removeCoupon } = useCoupon();

  const { clientSecret, orderData } =
    location.state || {};

  const [loading, setLoading] =
    useState(false);

  const submitHandler = async (e) => {
  e.preventDefault();

  if (!stripe || !elements) return;

  setLoading(true);

  try {
    const cardElement =
      elements.getElement(CardElement);

    const { error, paymentIntent } =
      await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      await createOrder({
        ...orderData,
        paymentIntentId: paymentIntent.id,
      });

      clearCart();

      removeCoupon();

      localStorage.removeItem(
        "shippingInfo"
      );

      toast.success(
        "Payment Successful!"
      );

      navigate("/order-success");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Payment failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={submitHandler}
      className="max-w-xl mx-auto bg-white shadow rounded-xl p-8"
    >
      <h2 className="text-2xl font-bold mb-6">
        Card Details
      </h2>

      <div className="border rounded-lg p-4 mb-6">
        <CardElement />
      </div>

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg"
      >
        {loading
          ? "Processing..."
          : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;