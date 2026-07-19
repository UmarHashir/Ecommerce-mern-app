import api from "./api";

export const getCoupons = () => {
  return api.get("/coupons");
};

export const getCouponById = (id) => {
  return api.get(`/coupons/${id}`);
};

export const createCoupon = (couponData) => {
  return api.post("/coupons", couponData);
};

export const updateCoupon = (id, couponData) => {
  return api.put(`/coupons/${id}`, couponData);
};

export const deleteCoupon = (id) => {
  return api.delete(`/coupons/${id}`);
};

export const validateCoupon = (couponData) => {
  return api.post("/coupons/validate", couponData);
};