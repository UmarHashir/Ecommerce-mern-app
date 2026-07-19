import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="container mx-auto py-20 text-center">

      <h1 className="text-4xl font-bold text-green-600">
        🎉 Order Placed Successfully
      </h1>

      <p className="mt-4 text-gray-600">
        Thank you for shopping with us.
      </p>

      <Link
        to="/shop"
        className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Continue Shopping
      </Link>

    </div>
  );
};

export default OrderSuccess;