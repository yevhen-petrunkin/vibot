const { adaptiveCards } = require("../adaptiveCards/cardIndex");
const fetchRemindersbyEmail = require("../db-functions/fetchRemindersbyEmail");
const handleDynamicAdaptiveCard = require("../handlers/handleDynamicAdaptiveCard");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");
const findAdaptiveCard = require("./findAdaptiveCard");
const checkIsDatePassed = require("./checkIsDatePassed");

async function createReminderArray({ sourceArr, context, credentials }) {
  try {
    const { userEmail, companyName } = credentials;
    const oldReminders = credentials.userReminders;

    const unusedReminders = sourceArr.filter(
      ({ verb }) =>
        !oldReminders.some(
          (reminder) => verb.toLowerCase() === reminder.verb.toLowerCase()
        )
    );

    let remindersToAdd = [];

    if (unusedReminders && unusedReminders.length) {
      const reminderPromises = unusedReminders.map(async ({ checkup }) => {
        const reminder = await checkup(context, credentials);
        if (reminder) {
          return await reminder;
        }
      });
      remindersToAdd = await Promise.all(reminderPromises);

      remindersToAdd = remindersToAdd.filter((reminder) => reminder);
    }

    const newReminders = [...oldReminders, ...remindersToAdd];

    const actualReminders = newReminders.filter(({ triggerDate }) =>
      checkIsDatePassed(triggerDate)
    );

    console.log("createReminderArray: actualReminders: ", actualReminders);

    if (actualReminders && actualReminders.length) {
      const { verb } = actualReminders[0];
      console.log("createReminderArray: actualReminders[0] verb: ", verb);
      const adaptiveCardData = await findAdaptiveCard(verb, adaptiveCards);

      const newData = await handleDynamicAdaptiveCard(
        adaptiveCardData,
        actualReminders[0]
      );

      await showAdaptiveCardByData(newData, context);
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
