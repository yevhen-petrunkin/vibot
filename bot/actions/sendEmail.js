const nodemailer = require("nodemailer");

async function sendEmail(emailCreator, config) {
  console.log("Sending email...");
  const email = emailCreator(config);
  let transporter = nodemailer.createTransport({
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
      user: "kovcheg_xxi_koval@ukr.net",
      pass: "HlJ7eLIDE2I6D2vr",
    },
  });
  try {
    let info = await transporter.sendMail(email);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.log(error.message);
    console.log("Failed to send email.");
  }
}

module.exports = sendEmail;
