async function handleAdminReplyMessages(verb, context, credentials) {
  let message = null;
  const { companyName, userEmail } = credentials;
  switch (verb.toLowerCase()) {
    case "companyCreated".toLowerCase():
      message = "Компанію буде створено...";
      break;

    case "companyReady".toLowerCase():
      message = `Компанія ${companyName} успішно створено. Для виклику робочого меню
введіть команду “Hello”`;
      break;

    case "submitReady".toLowerCase():
      message =
        "Ти успішно увійшов в акаунт. \n Для виклику робочого меню введіть команду “Hello”.";
      break;

    case "userCreated".toLowerCase():
      message = "Користувач буде створений...";
      break;

    case "userReady".toLowerCase():
      message =
        "Користувач успішно створений в базі компанії. \n Для продовження роботи введіть команду “Hello”.";
      break;

    case "delMessage".toLowerCase():
      message =
        "Користувач успішно видалені з бази компанії. \n Для продовження роботи введіть команду “Hello”.";
      break;

    case "updateUserMessage".toLowerCase():
      message =
        "Зміни успішно збережені в базі компанії. \n Для продовження роботи введіть команду “Hello”.";
      break;

    case "sendMessageMessage".toLowerCase():
      message =
        "Повідомлення відправлено. \n Для продовження роботи введіть команду “Hello”. ";
      break;

    case "downloadFileMessage".toLowerCase():
      message =
        "Файл успішно завантажено в меню користувачів. \n Для продовження роботи введіть команду “Hello”.";
      break;
    default:
      break;
  }
  if (message) {
    await context.sendActivity(message);
  }
}

module.exports = handleAdminReplyMessages;
