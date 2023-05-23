async function handleUserReplyMessages(verb, context, credentials) {
  let message = null;
  const { companyName, userEmail } = credentials;
  switch (verb.toLowerCase()) {
    case "perfReviewNoteMessage".toLowerCase():
      message = "Для виклику робочого меню введіть команду “Hello”.";
      break;
    case "answerToSendMessage".toLowerCase():
      message =
        "Повідомлення відправлено. Очікуй на відповідь. Для виклику робочого меню введіть команду “Hello”.";
      break;
    case "goalSentMessage".toLowerCase():
      message =
        "Ціль було відправлено. \n Для продовження роботи введіть команду “Hello”.";
      break;
    default:
      break;
  }
  if (message) {
    await context.sendActivity(message);
  }
}

module.exports = handleUserReplyMessages;
