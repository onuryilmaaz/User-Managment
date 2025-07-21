import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // veya "smtp"
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"MERN Auth" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text,
  });
};

export default sendEmail;
