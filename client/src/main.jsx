import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import { WishlistProvider } from "./context/WishlistContext";
import { CouponProvider } from "./context/CouponContext";
ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
  <ThemeProvider>
    <AuthProvider>
      <WishlistProvider>
      <CartProvider>
        <CouponProvider>
        <App />
        </CouponProvider>
      </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  </ThemeProvider>
</BrowserRouter>
);