import transporter from "../utils/mailTransport.js";
import paymentSuccessTemplate from "../templates/paymentSuccess.js";
import orderShippedTemplate from "../templates/orderShipped.js";
import orderDeliveredTemplate from "../templates/orderDelivered.js";
import orderConfirmationTemplate from "../templates/orderConfirmation.js";

export const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
};

export const sendOrderConfirmationEmail = async (
  user,
  order
) => {
  await sendEmail({
    to: user.email,
    subject: `Order Confirmation #${order._id}`,
    html: orderConfirmationTemplate(order),
  });
};

export const sendPaymentSuccessEmail = async (
  user,
  order
) => {
  await sendEmail({
    to: user.email,
    subject: `Payment Received - Order #${order._id}`,
    html: paymentSuccessTemplate(order),
  });
};

export const sendOrderShippedEmail = async (
  user,
  order
) => {
  await sendEmail({
    to: user.email,
    subject: `Your Order Has Been Shipped`,
    html: orderShippedTemplate(order),
  });
};

export const sendOrderDeliveredEmail = async (
  user,
  order
) => {
  await sendEmail({
    to: user.email,
    subject: `Order Delivered`,
    html: orderDeliveredTemplate(order),
  });
};