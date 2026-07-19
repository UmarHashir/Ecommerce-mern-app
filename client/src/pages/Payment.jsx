import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { stripePromise } from "../config/stripe";
import PaymentForm from "../components/payment/PaymentForm";

const Payment = () => {
  const location = useLocation();

  const { clientSecret } =
    location.state || {};

  if (!clientSecret) {
    return (
      <div className="container mx-auto py-10">
        Invalid payment session.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
        }}
      >
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Payment;