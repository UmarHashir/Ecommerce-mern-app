import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  getCart,
  addToCart as addToCartApi,
  updateCartItem,
  removeCartItem,
  clearCart as clearCartApi,
} from "../services/cartService";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] =
  useState([]);
const { user } = useAuth();

useEffect(() => {
  if (user) {
    fetchCart();
  } else {
    setCartItems([]);
  }
}, [user]);


const fetchCart = async () => {
  try {
    const { data } =
      await getCart();

    const items =
      data.cart.items.map(
        (item) => ({
          ...item.product,
          quantity: item.quantity,
        })
      );

    setCartItems(items);
  } catch (error) {
    console.error(error);
  }
};

  const addToCart = async (
  product,
  quantity
) => {
  try {
    const { data } =
      await addToCartApi({
        productId: product._id,
        quantity,
      });

    const items =
      data.cart.items.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));

    setCartItems(items);

    toast.success(
      "Product added to cart"
    );
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to add product"
    );
  }
};

const increaseQuantity = async (
  id
) => {
  const item = cartItems.find(
    (item) => item._id === id
  );

  if (!item) return;

  try {
    const { data } =
      await updateCartItem({
        productId: id,
        quantity: item.quantity + 1,
      });

    const items =
      data.cart.items.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));

    setCartItems(items);
  } catch (error) {
    toast.error(
      "Failed to update cart"
    );
  }
};

const decreaseQuantity = async (
  id
) => {
  const item = cartItems.find(
    (item) => item._id === id
  );

  if (!item) return;

  if (item.quantity === 1) {
    removeFromCart(id);
    return;
  }

  try {
    const { data } =
      await updateCartItem({
        productId: id,
        quantity: item.quantity - 1,
      });

    const items =
      data.cart.items.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));

    setCartItems(items);
  } catch (error) {
    toast.error(
      "Failed to update cart"
    );
  }
};

const removeFromCart = async (
  id
) => {
  try {
    const { data } =
      await removeCartItem(id);

    const items =
      data.cart.items.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));

    setCartItems(items);

    toast.success(
      "Product removed"
    );
  } catch (error) {
    toast.error(
      "Failed to remove product"
    );
  }
};

const clearCart = async () => {
  try {
    await clearCartApi();

    setCartItems([]);
  } catch (error) {
    console.error(error);
  }
};

  return (
  <CartContext.Provider
    value={{
  cartItems,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
}}
  >
    {children}
  </CartContext.Provider>
);
};

export const useCart = () => useContext(CartContext);