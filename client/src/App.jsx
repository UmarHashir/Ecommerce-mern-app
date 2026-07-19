import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import ReviewOrder from "./pages/ReviewOrder";
import OrderSuccess from "./pages/OrderSuccess";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import EditUser from "./pages/admin/EditUser";
import Wishlist from "./pages/Wishlist";
import AddCoupon from "./pages/admin/AddCoupon";
import AdminCoupons from "./pages/admin/AdminCoupons";
import EditCoupon from "./pages/admin/EditCoupon";
import Payment from "./pages/Payment";
import Unauthorized from "./pages/Unauthorized";
import ServerError from "./pages/ServerError";
import AdminRoute from "./routes/AdminRoute";
function App() {

  return (
    <>
    <Toaster position="top-right"/>
    <Routes>
      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Pages (We'll protect these in upcoming modules) */}
      <Route path="/profile" element={<Profile />} />

      <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>

<Route
  path="/review-order"
  element={
    <ProtectedRoute>
      <ReviewOrder />
    </ProtectedRoute>
  }
/>

<Route path="/admin" element={
  <AdminRoute>
  <AdminDashboard />
  </AdminRoute>
  } 
  />

<Route
  path="/admin/products"
  element={
    <AdminRoute>
      <AdminProducts />
    </AdminRoute>
  }
/>

<Route
  path="/admin/products/new"
  element={
    <AdminRoute>
      <AddProduct />
    </AdminRoute>
  }
/>

<Route
  path="/admin/coupons"
  element={
    <AdminRoute>
      <AdminCoupons />
    </AdminRoute>
  }
/>
<Route
  path="/admin/coupons/:id/edit"
  element={
    <AdminRoute>
      <EditCoupon />
    </AdminRoute>
  }
/>
<Route
  path="/admin/coupons/new"
  element={
    <AdminRoute>
      <AddCoupon />
    </AdminRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <AdminUsers />
    </AdminRoute>
  }
/>
<Route
  path="/admin/users/:id/edit"
  element={
    <AdminRoute>
      <EditUser />
    </AdminRoute>
  }
/>
<Route
  path="/admin/products/:id/edit"
  element={
    <AdminRoute>
      <EditProduct />
    </AdminRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  }
/>

<Route
  path="/admin/orders/:id"
  element={
    <AdminRoute>
      <OrderDetails />
    </AdminRoute>
  }
/>

<Route
  path="/payment"
  element={<Payment />}
/>
<Route
  path="/order-success"
  element={
    <ProtectedRoute>
      <OrderSuccess />
    </ProtectedRoute>
  }
/>

      <Route path="/orders" element={<Orders />} />
      <Route
  path="/my-orders"
  element={<MyOrders />}
/>
<Route
  path="/orders/:id"
  element={<OrderDetails />}
/>

<Route
  path="/wishlist"
  element={<Wishlist />}
/>
<Route path="/unauthorized" element={<Unauthorized />} />

<Route path="/server-error" element={<ServerError />} />
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;