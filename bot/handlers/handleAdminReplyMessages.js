async function handleAdminReplyMessages(verb, context, credentials) {
  let message = null;
  const { companyName, userEmail } = credentials;
  switch (verb.toLowerCase()) {
    case "companyCreated".toLowerCase():
      message = "Йде запис даних про компанію...";
      break;

    case "companyReady".toLowerCase():
      message = `Компанія ${companyName} успішно створено. Для виклику робочого меню
введіть команду “Hello”`;
      break;

    case "submitReady".toLowerCase():
      message =
        "Ти успішно увійшов в акаунт. \n Для виклику робочого меню введіть команду “Hello”.";
      break;

    case "noEntryMessage".toLowerCase():
      message =
        "Не вдалося увійти в акаунт. Спробуй пізніше. \n Для продовження введіть команду “Hello”.";
      break;

    case "sameAccountAlert".toLowerCase():
      message =
        "Не вдалося створити акаунт з невідомої причини. \n Можливо, акаунт з таким email вже є в базі даних. Спробуй інший. \n Для продовження введіть команду “Hello”.";
      break;

    case "createUserMessage".toLowerCase():
      message = "Йде запис даних про користувача...";
      break;

    case "userCreated".toLowerCase():
      message =
        "Користувач успішно створений в базі компанії. \n Для продовження роботи введіть команду “Hello”.";
      break;

    case "updateUserMessage".toLowerCase():
      message = "Дані про користувача оновлюються...";
      break;

    case "userUpdated".toLowerCase():
      message =
        "Зміни успішно збережені в базі компанії. \n Для продовження роботи введіть команду “Hello”.";
      break;

    case "sendMessageMessage".toLowerCase():
      message =
        "Повідомлення відправлено. \n Для продовження роботи введіть команду “Hello”. ";
      break;

    case "downloadFileMessage".toLowerCase():
      message = "Файл завантажується...";
      break;

    case "fileDownloaded".toLowerCase():
      message =
        "Файл успішно завантажено в меню користувачів. \n Для продовження роботи введіть команду “Hello”.";
      break;

    case "delMessage".toLowerCase():
      message = "Запис про користувача видаляється...";
      break;

    case "userDeleted".toLowerCase():
      message =
        "Користувач був успішно видалений. \n Для продовження роботи введіть команду “Hello”.";
      break;

    case "noDeleteSelf".toLowerCase():
      message =
        "Ви не можете видалити самого себе. \n Спочатку передайте права адміністратора іншому співробітнику компанії. \n Для продовження роботи введіть команду “Hello”.";
      break;

    case "userNotDeleted".toLowerCase():
      message =
        "Користувач не був видалений з невідомої причини. Спробуй пізніше. \n Для продовження роботи введіть команду “Hello”.";
      break;

    case "userNotRegistered".toLowerCase():
      message =
        "Користувача не можна видалити, оскільки він ще не зареєструвався в системі. \n Для продовження роботи введіть команду “Hello”.";
      break;

    case "userNotUpdated".toLowerCase():
      message =
        "Дані про користувача не було оновлено. \n Можливо, інформація про нього невірна. Для продовження роботи введіть команду “Hello”.";
      break;

    case "noReminderMessage".toLowerCase():
      message =
        "Більше повідомлень немає. \n Для продовження роботи введіть команду “Hello”.";
      break;

    case "reminderSentMessage".toLowerCase():
      message =
        "Нагадування було відправлено. \n Для продовження роботи введіть команду “Hello”.";
      break;

    case "noCardFound".toLowerCase():
      message =
        "Не знайшов потрібної відповіді. Спробуй пізніше. \n Для продовження роботи введіть команду “Hello”.";
      break;

    default:
      break;
  }
  if (message) {
    await context.sendActivity(message);
  }
  return message;
}

module.exports = handleAdminReplyMessages;
