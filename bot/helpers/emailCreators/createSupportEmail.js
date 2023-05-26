function createSupportEmail(data) {
  const { userName, userEmail, userMessage } = data;
  return {
    from: "<kovcheg_xxi_koval@ukr.net>",
    to: "<kovcheg_xxi_koval@ukr.net>",
    subject: `Problem Description from ${userName}`,
    html: `<p><b>User Name:</b> ${userName}</p><br/><p><b>User Email:</b> ${userEmail}</p><br/><p><b>User Message:</b> ${userMessage}</p>`,
  };
}

module.exports = createSupportEmail;
