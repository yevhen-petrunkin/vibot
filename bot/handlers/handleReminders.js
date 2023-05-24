async function handleReminders(verb, config) {
  try {
    const { context, credentials, reminders, reminderIndex } = config;
    const reminder = reminders[reminderIndex];
    let newReminders = reminders;

    switch (verb.toLowerCase()) {
      case "messageOk".toLowerCase():
        reminder.complete = true;
        newReminders.splice(reminderIndex, 1, reminder);
        break;

      //   case "activeLiter".toLowerCase():
      //     reminder.complete = true;
      //     newReminders.splice(reminderIndex, 1, reminder);
      //     break;
    }

    console.log(
      `Processed reminder ${verb} successfully. Processed reminders: ${newReminders}`
    );
    return newReminders;
  } catch (error) {
    console.log(error.message);
    console.log(
      `Failed to process reminder ${verb}. Return unprocessed reminders.`
    );
    return reminders;
  }
}

module.exports = handleReminders;
