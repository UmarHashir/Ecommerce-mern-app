import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../services/orderService";
import { downloadInvoice } from "../services/orderService";
import { toast } from "react-hot-toast";
const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

   const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const { data } = await getOrderById(id);

      setOrder(data.order);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadInvoiceHandler =
  async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response =
        await downloadInvoice(
          order._id,
          token
        );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download = `invoice-${order._id}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success(
        "Invoice downloaded"
      );
    } catch (error) {
      toast.error(
        "Failed to download invoice"
      );
    }
  };

  if (!order) {
    return (
      <div className="container mx-auto py-10">
        Loading...
      </div>
    );
  }

  return (
  <div className="container mx-auto py-10">
    <h1 className="text-3xl font-bold mb-8">
      Order #{order._id.slice(-8)}
    </h1>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Left Side */}
      <div className="lg:col-span-2 space-y-6">

        {/* Shipping */}
        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Shipping Information
          </h2>

          <p>
            <strong>Name:</strong>{" "}
            {order.shippingInfo.fullName}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {order.shippingInfo.phone}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {order.shippingInfo.address}
          </p>

          <p>
            {order.shippingInfo.city},{" "}
            {order.shippingInfo.state}
          </p>

          <p>
            {order.shippingInfo.postalCode}
          </p>

          <p>
            {order.shippingInfo.country}
          </p>
        </div>

        {/* Products */}
        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-5">
            Ordered Products
          </h2>

          <div className="space-y-5">
            {order.orderItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="font-bold">
                  $
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Side */}
      <div className="border rounded-xl p-6 shadow-sm h-fit">

        <h2 className="text-xl font-semibold mb-6">
          Order Summary
        </h2>

        <div className="flex justify-between mb-3">
          <span>Subtotal</span>
          <span>
            ${order.itemsPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between mb-3">
          <span>Shipping</span>
          <span>
            {order.shippingPrice === 0
              ? "Free"
              : `$${order.shippingPrice}`}
          </span>
        </div>

        {order.coupon && (
          <div className="flex justify-between mb-3 text-green-600">
            <span>
              Coupon ({order.coupon.code})
            </span>

            <span>
              -$
              {order.coupon.discountAmount.toFixed(
                2
              )}
            </span>
          </div>
        )}

        <hr className="my-4" />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>

          <span>
            ${order.totalPrice.toFixed(2)}
          </span>
        </div>

        <div className="mt-8 space-y-3">

          <div className="flex justify-between">
            <span>Payment</span>

            <span
              className={`font-semibold ${
                order.isPaid
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {order.isPaid
                ? "Paid"
                : "Unpaid"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Status</span>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {order.orderStatus}
            </span>
          </div>

        </div>
        {order.isPaid && (
  <button
    onClick={downloadInvoiceHandler}
    className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
  >
    Download Invoice
  </button>
)}

      </div>

    </div>
  </div>
);
};

export default OrderDetails;