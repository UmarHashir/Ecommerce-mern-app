import emailLayout from "./layouts/emailLayout.js";

const orderConfirmationTemplate = (
  order
) => {
  const items = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding:10px;border-bottom:1px solid #eee;">
          ${item.name}
        </td>

        <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">
          ${item.quantity}
        </td>

        <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
          $${item.price}
        </td>
      </tr>
    `
    )
    .join("");

  return emailLayout({
  title: "Order Confirmation",

  content: `
  
  YOUR CURRENT CONTENT HERE
  
  `,
});
};

export default orderConfirmationTemplate;