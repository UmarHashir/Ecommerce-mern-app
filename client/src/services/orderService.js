import api from "./api";

export const createOrder = (orderData) => {
  return api.post("/orders", orderData);
};

export const getMyOrders = () => {
  return api.get("/orders/my-orders");
};

export const getOrderById = (id) => {
  return api.get(`/orders/${id}`);
};

export const getAllOrders = () => {
  return api.get("/orders/admin/all");
};

export const updateOrderStatus = (
  id,
  orderStatus
) => {
  return api.put(`/orders/admin/${id}`, {
    orderStatus,
  });
};

export const downloadInvoice = async (
  orderId
) => {
  const response = await api.get(
    `/orders/${orderId}/invoice`,
    {
      responseType: "blob",

      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }
  );

  return response;
};