import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useWishlist } from "../../context/WishlistContext";
import {
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaStore,
  FaBox,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

import { MdDashboard } from "react-icons/md";

import { NavLink } from "react-router-dom";

import { useState, useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] =
  useState(false);

const menuRef = useRef();

  const cartCount = cartItems.reduce(
  (acc, item) => acc + item.quantity,
  0
);

  const logoutHandler = async () => {
    try {
      await logout();

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  useEffect(() => {
  const handler = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target)
    ) {
      setShowMenu(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handler
  );

  return () =>
    document.removeEventListener(
      "mousedown",
      handler
    );
}, []);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Left part */}
        <Link
  to="/"
  className="flex items-center gap-2 text-2xl font-bold text-blue-600"
>
  <FaStore />

  <span>MERN Store</span>
</Link>

        {/* Center */}
          <div className="flex items-center gap-6">

  {user?.role === "admin" && (
    <Link
      to="/admin"
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
    >
      <MdDashboard />

      Admin
    </Link>
  )}

  <NavLink
  to="/"
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "hover:text-blue-600 transition"
  }
>
  Home
</NavLink>

  <NavLink
  to="/shop"
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "hover:text-blue-600 transition"
  }
>
  Shop
</NavLink>

  {/* Right */}
  <Link
  to="/wishlist"
  className="relative"
>
  <FaHeart className="text-2xl hover:text-red-600 transition" />

  {wishlist.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {wishlist.length}
    </span>
  )}
</Link>

<Link
  to="/cart"
  className="relative"
>
  <FaShoppingCart className="text-2xl hover:text-blue-600 transition" />

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {cartCount}
    </span>
  )}
</Link>

<div
  className="relative"
  ref={menuRef}
>
  
  <FaUserCircle
    onClick={() =>
      setShowMenu(!showMenu)
    }
    className="text-4xl cursor-pointer hover:text-blue-600 transition"
  />

  {showMenu && (
    <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border z-50">

      <div className="p-4 border-b">

        <p className="font-semibold">
          {user?.name}
        </p>

        <p className="text-sm text-gray-500">
          {user?.email}
        </p>

      </div>

      <NavLink
        to="/profile"
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <FaUser />

        My Profile
      </NavLink>

      <NavLink
        to="/my-orders"
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <FaBox />

        My Orders
      </NavLink>

      {user?.role === "admin" && (
        <NavLink
          to="/admin"
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
        >
          <MdDashboard />

          Dashboard
        </NavLink>
      )}

      <button
        onClick={logoutHandler}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600"
      >
        <FaSignOutAlt />

        Logout
      </button>

    </div>
  )}
</div>
</div>          
      </div>
    </nav>
  );
};

export default Navbar;