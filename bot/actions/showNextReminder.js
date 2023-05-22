const showAdaptiveCardByData = require("./showAdaptiveCardByData");
const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const { adaptiveCards } = require("../adaptiveCards/cardIndex");

async function showNextReminder(nextReminder, context) {
  const adaptiveCardData = await findAdaptiveCard(
    nextReminder.verb,
    adaptiveCards
  );
  await showAdaptiveCardByData(adaptiveCardData, context);
}

module.exports = showNextReminder;
