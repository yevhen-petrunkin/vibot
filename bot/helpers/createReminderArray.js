const { adaptiveCards } = require("../adaptiveCards/cardIndex");
const fetchRemindersbyEmail = require("../db-functions/fetchRemindersbyEmail");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");
const findAdaptiveCard = require("./findAdaptiveCard");
const checkIsDatePassed = require("./checkIsDatePassed");

async function createReminderArray({ sourceArr, context, credentials }) {
  try {
    const { userEmail, companyName } = credentials;
    const oldReminders = await fetchRemindersbyEmail(userEmail, companyName);
    console.log("createReminderArray: oldReminders: ", oldReminders);

    const unusedReminders = sourceArr.filter(
      ({ verb }) =>
        !oldReminders.some(
          (reminder) => verb.toLowerCase() === reminder.verb.toLowerCase()
        )
    );
    console.log("createReminderArray: unusedReminders: ", unusedReminders);

    let remindersToAdd = [];

    if (unusedReminders && unusedReminders.length) {
      const reminderPromises = unusedReminders.map(async ({ checkup }) => {
        const reminder = await checkup(context, credentials);
        if (reminder) {
          console.log("createReminderArray: reminderToAdd: ", reminder);
          return await reminder;
        }
      });
      remindersToAdd = await Promise.all(reminderPromises);
      console.log("createReminderArray: remindersToAdd", remindersToAdd);
      remindersToAdd = remindersToAdd.filter((reminder) => reminder);
      console.log(
        "createReminderArray: filtered remindersToAdd",
        remindersToAdd
      );
    }

    const newReminders = [...oldReminders, ...remindersToAdd];
    console.log("createReminderArray: newReminders: ", newReminders);

    const actualReminders = newReminders.filter(({ triggerDate }) =>
      checkIsDatePassed(triggerDate)
    );

    console.log("createReminderArray: actualReminders: ", actualReminders);

    if (actualReminders && actualReminders.length) {
      const { verb } = actualReminders[0];
      console.log("createReminderArray: actualReminders[0] verb: ", verb);

      const adaptiveCardData = await findAdaptiveCard(verb, adaptiveCards);
      await showAdaptiveCardByData(adaptiveCardData, context);
    }

    return actualReminders;
  } catch (error) {
    console.log(error.message);
    console.log(
      "createReminderArray: Failed to create reminder array. return empty array."
    );
    return [];
  }
}

module.exports = createReminderArray;
