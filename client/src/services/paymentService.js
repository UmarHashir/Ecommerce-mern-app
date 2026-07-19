import api from "./api";

export const createPaymentIntent = (amount) => {
  return api.post(
    "/payments/create-payment-intent",
    {
      amount,
    }
  );
};