async function handleReminderReplyMessages(verb, context) {
  let message = "Для продовження введіть Hello.";

  switch (verb.toLowerCase()) {
    case "messageOkMessage".toLowerCase():
      message = "Молодець! Гарна робота.";
      break;

    default:
      break;
  }
  if (message) {
    await context.sendActivity(message);
  }
}

module.exports = handleReminderReplyMessages;
