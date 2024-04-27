const nodemailer = require("nodemailer");
// const { options } = require("../routes/user");

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      // Ensure TLS v1.2 is used
      minVersion: "TLSv1.2",
    },
  });
  const mailOptions = {
    from : "Subhan <subhanjee14@gmail.com>", 
    to: options.mail,
    subject: options.subject,
    text: options.message,
  }
  await transporter.sendMail(mailOptions)
};

module.exports = sendEmail