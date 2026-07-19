import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getDashboardStats } from "../../services/dashboardService";
import DashboardStatCard from "../../components/admin/DashboardStatCard";
import RevenueChart from "../../components/admin/RevenueChart";
import RevenueOrdersChart from "../../components/admin/charts/RevenueOrdersChart";
import OrderStatusPieChart from "../../components/admin/charts/OrderStatusPieChart";
import TopSellingProducts from "../../components/admin/TopSellingProducts";
const AdminDashboard = () => {
  const [stats, setStats] = useState({
  totalProducts: 0,
  totalUsers: 0,
  totalOrders: 0,
  totalRevenue: 0,

  monthlyRevenue: 0,
  monthlyOrders: 0,
  newUsers: 0,
  averageOrderValue: 0,
});
  const [recentOrders, setRecentOrders] =
    useState([]);

  const [lowStockProducts, setLowStockProducts] =
    useState([]);

    const [monthlyAnalytics, setMonthlyAnalytics] =
  useState([]);

  const [
  orderStatusAnalytics,
  setOrderStatusAnalytics,
] = useState([]);

const [monthlyRevenue, setMonthlyRevenue] =
  useState([]);

const [
  topSellingProducts,
  setTopSellingProducts,
] = useState([]);


  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } =
        await getDashboardStats();
   //   console.log(data);
      setStats(data.stats);
      setRecentOrders(data.recentOrders);
      setLowStockProducts(
        data.lowStockProducts
      );
      setMonthlyAnalytics(
  data.monthlyAnalytics
);

setOrderStatusAnalytics(
  data.orderStatusAnalytics
);

setTopSellingProducts(
  data.topSellingProducts
);

setMonthlyRevenue(data.monthlyRevenue);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

  <DashboardStatCard
    title="Total Revenue"
    value={`$${stats.totalRevenue}`}
  />

  <DashboardStatCard
    title="Total Orders"
    value={stats.totalOrders}
  />

  <DashboardStatCard
    title="Total Products"
    value={stats.totalProducts}
  />

  <DashboardStatCard
    title="Total Users"
    value={stats.totalUsers}
  />

  <DashboardStatCard
    title="Revenue This Month"
    value={`$${stats.monthlyRevenue}`}
  />

  <DashboardStatCard
    title="Orders This Month"
    value={stats.monthlyOrders}
  />

  <DashboardStatCard
    title="New Users"
    value={stats.newUsers}
  />

  <DashboardStatCard
    title="Average Order"
    value={`$${stats.averageOrderValue}`}
  />

</div>

<div className="mt-8">
  <RevenueOrdersChart
    data={stats.monthlyAnalytics}
/>
</div>

<div className="grid lg:grid-cols-2 gap-6 mt-8">

  <OrderStatusPieChart
  data={stats.orderStatusAnalytics || []}
/>

  {/* Next widget goes here */}

  <TopSellingProducts
  products={stats.topSellingProducts || []}
/>

</div>

      {/* </div> */}
      
      <div className="grid lg:grid-cols-2 gap-6 mt-8">

  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="text-xl font-semibold mb-4">
      Recent Orders
    </h2>

    <div className="space-y-4">

      {recentOrders.length === 0 ? (
        <p className="text-gray-500">
          No orders found.
        </p>
      ) : (
        recentOrders.map((order) => (
          <div
            key={order._id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <p className="font-medium">
                {order.user?.name}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ${order.totalPrice}
              </p>

              <span
                className={`text-xs px-2 py-1 rounded-full text-white ${
                  order.orderStatus === "Delivered"
                    ? "bg-green-600"
                    : order.orderStatus === "Shipped"
                    ? "bg-blue-600"
                    : order.orderStatus === "Processing"
                    ? "bg-yellow-500"
                    : "bg-red-600"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>

          </div>
        ))
      )}

    </div>

  </div>
    <div className="bg-white rounded-xl shadow p-6">

    <h2 className="text-xl font-semibold mb-4">
      Low Stock Products
    </h2>

    <div className="space-y-4">

      {lowStockProducts.length === 0 ? (
        <p className="text-gray-500">
          No low stock products.
        </p>
      ) : (
        lowStockProducts.map((product) => (
          <div
            key={product._id}
            className="flex justify-between items-center border-b pb-3"
          >
            <span>
              {product.name}
            </span>

            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
              {product.stock} left
            </span>

          </div>
        ))
      )}

    </div>

  </div>

</div>

    </AdminLayout>
    
  );
};

export default AdminDashboard;