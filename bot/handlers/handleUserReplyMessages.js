async function handleUserReplyMessages(verb, context, credentials) {
  let message = null;
  const { companyName, userEmail } = credentials;
  switch (verb.toLowerCase()) {
    // case "companyCreated".toLowerCase():
    //   message = "The company is being created...";
    //   break;

    default:
      break;
  }
  if (message) {
    await context.sendActivity(message);
  }
}

module.exports = handleUserReplyMessages;
