import notificationTemplate from "./notificationTemplate.js";

const orderDeliveredTemplate = (
  order
) => {
  return notificationTemplate({
    title:
      "Order Delivered 📦",

    message: `
      Your order

      <strong>#${order._id}</strong>

      has been delivered.

      Thank you for shopping with MERN Shop.

      We hope to see you again!
    `,
  });
};

export default orderDeliveredTemplate;