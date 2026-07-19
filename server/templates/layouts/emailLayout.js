const emailLayout = ({
  title,
  content,
}) => {
  return `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
/>

</head>

<body
style="
margin:0;
padding:40px;
background:#f3f4f6;
font-family:Arial,sans-serif;
"
>

<table
width="100%"
cellspacing="0"
cellpadding="0"
>

<tr>

<td align="center">

<table
width="700"
style="
background:white;
border-radius:12px;
overflow:hidden;
"
>

<tr>

<td
style="
background:#2563eb;
padding:30px;
text-align:center;
color:white;
"
>

<h1
style="margin:0;"
>
🛍️ MERN SHOP
</h1>

<p
style="
margin-top:10px;
"
>
Modern E-Commerce Store
</p>

</td>

</tr>

<tr>

<td
style="padding:40px;"
>

<h2
style="
margin-top:0;
"
>
${title}
</h2>

${content}

</td>

</tr>

<tr>

<td
style="
padding:25px;
background:#f9fafb;
text-align:center;
color:#6b7280;
font-size:14px;
"
>

Thank you for shopping with us ❤️

<br><br>

© ${new Date().getFullYear()} MERN Shop

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;
};

export default emailLayout;