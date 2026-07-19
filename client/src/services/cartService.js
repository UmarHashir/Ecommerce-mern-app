import api from "./api";

export const getCart = () =>
  api.get("/cart");

export const addToCart = (data) =>
  api.post("/cart", data);

export const updateCartItem = (data) =>
  api.put("/cart", data);

export const removeCartItem = (
  productId
) =>
  api.delete(`/cart/${productId}`);

export const clearCart = () =>
  api.delete("/cart");