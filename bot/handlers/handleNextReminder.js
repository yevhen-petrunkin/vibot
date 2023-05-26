const { adaptiveCards } = require("../adaptiveCards/cardIndex");
const updateAllReminders = require("../db-functions/updateAllReminders");
const checkIsDatePassed = require("../helpers/checkIsDatePassed");
const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");
const showNextReminder = require("../actions/showNextReminder");

async function handleNextReminder(config) {
  try {
    const { context, credentials, reminders, reminderIndex } = config;
    const { userEmail, userReminders, companyName } = credentials;
    let nextReminder = "";

    const unusedUserReminders = await userReminders.filter(
      ({ triggerDate }) => !checkIsDatePassed(triggerDate)
    );

    const filteredNewReminders = await reminders.filter(
      ({ complete }) => !complete
    );

    const aggrReminders = [...filteredNewReminders, ...unusedUserReminders];

    await updateAllReminders(userEmail, aggrReminders, companyName);

    if (reminderIndex >= reminders.length) {
      nextReminder = "activeNoMessage";
      const adaptiveCardData = await findAdaptiveCard(
        nextReminder,
        adaptiveCards
      );
      await showAdaptiveCardByData(adaptiveCardData, context);
      console.log("No more reminders left.");
      return;
    }
    const newReminder = reminders[reminderIndex];

    await showNextReminder(newReminder, context);
    return;
  } catch (error) {
    console.log(error.message);
    console.log(" Failed to determine next reminder.");
    return;
  }
}

module.exports = handleNextReminder;
