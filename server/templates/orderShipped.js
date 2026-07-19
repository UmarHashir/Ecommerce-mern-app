import notificationTemplate from "./notificationTemplate.js";

const orderShippedTemplate = (
  order
) => {
  return notificationTemplate({
    title: "Your Order Has Been Shipped 🚚",

    message: `
      Great news!

      <br><br>

      Your order

      <strong>#${order._id}</strong>

      has been shipped.

      It is now on its way to you.
    `,
  });
};

export default orderShippedTemplate;