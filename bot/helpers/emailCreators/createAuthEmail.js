function createAuthEmail({ recipientEmail, authEmail, authKeyword }) {
  return {
    from: "<kovcheg_xxi_koval@ukr.net>",
    to: recipientEmail,
    subject: "Hello",
    text: "Hello, I am your bot!",
    html: `<h1>Hello, I am your V7Bot.</h1><br/><p>Your email: ${authEmail}</p><br/><p>Your keyword: ${authKeyword}</p><br/><img src="cid:uniqueAdaptiveCard@nodemailer.com"/>`,
    attachments: [
      {
        filename: "image.jpg",
        path: "./images/image.jpg",
        cid: "uniqueAdaptiveCard@nodemailer.com",
      },
    ],
  };
}

module.exports = createAuthEmail;
