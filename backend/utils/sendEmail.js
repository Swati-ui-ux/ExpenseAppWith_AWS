const nodemailer = require("nodemailer");

const sendEmail = async (to, link) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: to,
    subject: "Password Reset",
    html: `
      <h3>Password Reset</h3>
      <p>Click below link to reset password:</p>
      <a href="${link}">Click</a>
    `
  });
}

module.exports = sendEmail