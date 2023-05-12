async function handleAdminReplyMessages(verb, context, credentials) {
  let message = null;
  const { companyName, userEmail } = credentials;
  switch (verb.toLowerCase()) {
    case "companyCreated".toLowerCase():
      message = "The company is being created...";
      break;

    case "companyReady".toLowerCase():
      message = `${companyName} company has been created successfully. Admin email is ${userEmail}`;
      break;

    case "userCreated".toLowerCase():
      message = "The user is being created...";
      break;

    case "userReady".toLowerCase():
      message = "The user has been created successfully.";
      break;

    default:
      break;
  }
  if (message) {
    await context.sendActivity(message);
  }
}

module.exports = handleAdminReplyMessages;
