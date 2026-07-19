import PDFDocument from "pdfkit";

const generateInvoice = (order, res) => {
  const doc = new PDFDocument({
    margin: 50,
  });

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${order._id}.pdf`
  );

  doc.pipe(res);

  // ===========================
  // Header
  // ===========================

  doc
    .fontSize(26)
    .text("MERN SHOP", {
      align: "center",
    });

  doc.moveDown();

  doc
    .fontSize(18)
    .text("INVOICE", {
      align: "center",
    });

  doc.moveDown();

  doc.fontSize(12);

  doc.text(
    `Invoice ID: ${order._id}`
  );

  doc.text(
    `Date: ${new Date(
      order.createdAt
    ).toLocaleDateString()}`
  );

  doc.moveDown();

  // ===========================
  // Customer
  // ===========================

  doc
    .fontSize(16)
    .text("Customer");

  doc.moveDown(0.5);

  doc.fontSize(12);

  doc.text(
    `Name: ${order.shippingInfo.fullName}`
  );

  doc.text(
    `Phone: ${order.shippingInfo.phone}`
  );

  doc.text(
    `Email: ${order.user.email}`
  );

  doc.moveDown();

  // ===========================
  // Shipping Address
  // ===========================

  doc
    .fontSize(16)
    .text("Shipping Address");

  doc.moveDown(0.5);

  doc.fontSize(12);

  doc.text(
    order.shippingInfo.address
  );

  doc.text(
    `${order.shippingInfo.city}, ${order.shippingInfo.state}`
  );

  doc.text(
    `${order.shippingInfo.country}`
  );

  doc.text(
    `${order.shippingInfo.postalCode}`
  );

  doc.moveDown();

  // ===========================
  // Products
  // ===========================

  doc
    .fontSize(16)
    .text("Products");

  doc.moveDown();

  order.orderItems.forEach((item) => {
    doc.fontSize(12);

    doc.text(
      `${item.name}`
    );

    doc.text(
      `Qty: ${item.quantity}`
    );

    doc.text(
      `Price: $${item.price}`
    );

    doc.text(
      `Total: $${
        item.price *
        item.quantity
      }`
    );

    doc.moveDown();
  });

  doc.moveDown();

  // ===========================
  // Summary
  // ===========================

  doc
    .fontSize(16)
    .text("Order Summary");

  doc.moveDown();

  doc.fontSize(12);

  doc.text(
    `Subtotal: $${order.itemsPrice}`
  );

  doc.text(
    `Shipping: $${order.shippingPrice}`
  );

  if (order.coupon) {
    doc.text(
      `Coupon (${order.coupon.code}): -$${order.coupon.discountAmount}`
    );
  }

  doc.moveDown();

  doc
    .fontSize(15)
    .text(
      `Total: $${order.totalPrice}`
    );

  doc.moveDown();

  // ===========================
  // Status
  // ===========================

  doc.fontSize(12);

  doc.text(
    `Payment Status: ${
      order.isPaid
        ? "Paid"
        : "Pending"
    }`
  );

  doc.text(
    `Order Status: ${order.orderStatus}`
  );

  doc.moveDown(2);

  doc
    .fontSize(12)
    .text(
      "Thank you for shopping with MERN SHOP ❤️",
      {
        align: "center",
      }
    );

  doc.end();
};

export default generateInvoice;