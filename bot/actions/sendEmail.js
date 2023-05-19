const nodemailer = require("nodemailer");

async function sendEmail(email) {
  console.log("Sending email...");
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
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = sendEmail;
