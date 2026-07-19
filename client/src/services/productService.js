import api from "./api";

// Get all products with filters
export const getProducts = async (params = {}) => {
  const response = await api.get("/products", {
    params,
  });

  return response.data;
};

// Featured products
export const getFeaturedProducts = async () => {
  const response = await api.get("/products/featured");
  return response.data;
};

// New arrivals
export const getNewArrivals = async () => {
  const response = await api.get("/products/new-arrivals");
  return response.data;
};

// Single product
export const getProduct = (id) => api.get(`/products/${id}`);

export const getAllProductsAdmin = (params = {}) => {
  return api.get("/products", {
    params,
  });
};

export const createProduct = (formData) => {
  return api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

export const updateProduct = (id, formData) => {
  return api.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

export const createReview = (
  productId,
  reviewData
) => {
  return api.post(
    `/products/${productId}/reviews`,
    reviewData
  );
};