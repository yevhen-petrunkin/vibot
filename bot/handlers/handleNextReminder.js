const { adaptiveCards } = require("../adaptiveCards/cardIndex");
const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");
const showNextReminder = require("../actions/showNextReminder");

async function handleNextReminder(reminderIndex, reminders, context) {
  try {
    let nextReminder = "";
    console.log("Reminder index: ", reminderIndex);
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
    nextReminder = reminders[reminderIndex];
    console.log("nextReminder: ", reminderIndex);

    await showNextReminder(nextReminder, context);
    return;
  } catch (error) {
    console.log(error.message);
    console.log("handleNextReminder: Failed to determine next reminder.");
    return;
  }
}

module.exports = handleNextReminder;
