async function handleAdminReplyMessages(verb, context, credentials) {
  let message = null;
  const { companyName, userEmail } = credentials;
  switch (verb.toLowerCase()) {
    case "companyCreated".toLowerCase():
      message = "Компанію буде створено...";
      break;

    case "companyReady".toLowerCase():
      message = `Компанія ${companyName} була створена успішно. Email адміністратора ${userEmail}. Будь ласка увійди в акаунт!`;
      break;

    case "userCreated".toLowerCase():
      message = "Користувач буде створений...";
      break;

    case "userReady".toLowerCase():
      message = "Користувач успішно створений в базі компанії.";
      break;
    case "delMessage".toLowerCase():
      message = "Користувача буде видалено з бази компанії...";
      break;
    case "updateUserMessage".toLowerCase():
      message = "Зміни будуть збережені в базі компанії...";
      break;
    case "submitReady".toLowerCase():
      message =
        "Ти успішно увійшов в акаунт натисни/набери Hello для продовження нашого спілкування!😉";
      break;
    default:
      break;
  }
  if (message) {
    await context.sendActivity(message);
  }
}

module.exports = handleAdminReplyMessages;
