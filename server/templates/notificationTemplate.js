import emailLayout from "./layouts/emailLayout.js";

const notificationTemplate = ({
  title,
  message,
  buttonText,
  buttonLink,
}) => {
  return emailLayout({
    title,

    content: `
      <p
      style="
      font-size:16px;
      color:#374151;
      line-height:28px;
      ">
        ${message}
      </p>

      ${
        buttonLink
          ? `
      <div
      style="
      margin-top:40px;
      text-align:center;
      ">

      <a
      href="${buttonLink}"

      style="
      background:#2563eb;
      color:white;
      padding:14px 28px;
      text-decoration:none;
      border-radius:8px;
      display:inline-block;
      font-weight:bold;
      ">

      ${buttonText}

      </a>

      </div>
      `
          : ""
      }
    `,
  });
};

export default notificationTemplate;