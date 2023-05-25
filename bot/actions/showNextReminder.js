const showAdaptiveCardByData = require("./showAdaptiveCardByData");
const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const handleDynamicAdaptiveCard = require("../handlers/handleDynamicAdaptiveCard");
const { adaptiveCards } = require("../adaptiveCards/cardIndex");

async function showNextReminder(newReminder, context) {
  try {
    console.log("showNextReminder: newReminder", newReminder);

    const adaptiveCardData = await findAdaptiveCard(
      newReminder.verb,
      adaptiveCards
    );

    const newData = await handleDynamicAdaptiveCard(
      adaptiveCardData,
      newReminder
    );

    await showAdaptiveCardByData(newData, context);
    return;
  } catch (error) {
    console.log(error.message);
    console.log(`Cannot show next reminder ${newReminder.verb}.`);
    return;
  }
}

module.exports = showNextReminder;
