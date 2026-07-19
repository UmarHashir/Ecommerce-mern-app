import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import AdminLayout from "../../components/admin/AdminLayout";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/orderService";
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await getAllOrders();

      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatusHandler = async (
  id,
  status
) => {
  try {
    await updateOrderStatus(id, status);

    toast.success("Order updated");

    fetchOrders();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to update order"
    );
  }
};
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">
        Orders
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">
                Order ID
              </th>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Total
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
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
                  {order.user?.name}
                </td>

                <td className="p-4">
                  ${order.totalPrice}
                </td>

                <td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-white text-sm ${
      order.orderStatus === "Processing"
        ? "bg-yellow-500"
        : order.orderStatus === "Shipped"
        ? "bg-blue-500"
        : order.orderStatus === "Delivered"
        ? "bg-green-600"
        : "bg-red-500"
    }`}
  >
    {order.orderStatus}
  </span>
</td>

                <td className="p-4">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4 space-y-2">

  <Link
    to={`/admin/orders/${order._id}`}
    className="block text-center bg-blue-600 text-white px-3 py-2 rounded"
  >
    View
  </Link>

  <select
    value={order.orderStatus}
    onChange={(e) =>
      updateStatusHandler(
        order._id,
        e.target.value
      )
    }
    className="border rounded w-full p-2"
  >
    <option value="Processing">
      Processing
    </option>

    <option value="Shipped">
      Shipped
    </option>

    <option value="Delivered">
      Delivered
    </option>

    <option value="Cancelled">
      Cancelled
    </option>
  </select>

</td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;