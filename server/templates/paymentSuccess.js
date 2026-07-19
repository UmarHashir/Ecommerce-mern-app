import notificationTemplate from "./notificationTemplate.js";

const paymentSuccessTemplate = (
  order
) => {
  return notificationTemplate({
    title: "Payment Successful",

    message: `
      Your payment for
      <strong>Order #${order._id}</strong>
      has been received successfully.

      <br><br>

      Amount Paid:
      <strong>$${order.totalPrice}</strong>
    `,
  });
};

export default paymentSuccessTemplate;