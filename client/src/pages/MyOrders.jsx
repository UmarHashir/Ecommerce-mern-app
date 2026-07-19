import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/orderService";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } =
        await getMyOrders();

      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">
            No Orders Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Start shopping to place your first order.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  Order ID
                </th>

                <th className="text-left p-4">
                  Date
                </th>

                <th className="text-left p-4">
                  Total
                </th>

                <th className="text-left p-4">
                  Payment
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr
                  key={order._id}
                  className="border-t"
                >

                  <td className="p-4">
                    {order._id.slice(-8)}
                  </td>

                  <td className="p-4">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    ${order.totalPrice}
                  </td>

                  <td className="p-4">

                    {order.isPaid ? (
                      <span className="text-green-600 font-medium">
                        Paid
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Unpaid
                      </span>
                    )}

                  </td>

                  <td className="p-4">

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

                      {order.orderStatus}

                    </span>

                  </td>

                  <td className="p-4">

                    <Link
                      to={`/orders/${order._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default MyOrders;