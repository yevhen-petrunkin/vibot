const { rawNavigateCard } = require("../adaptiveCards/cardIndex");

const createAdaptiveCardFromObject = require("../helpers/createAdaptiveCardFromObject");
const { adaptiveCards } = require("../adaptiveCards/cardIndex");
const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const fetchMessageAdaptiveCardCommandById = require("../db-functions/fetchMessageAdaptiveCardCommandById.js");
const postPrimaryUserData = require("../db-functions/postPrimaryUserData");
const changeDataInAdaptiveCard = require("../helpers/changeDataInAdaptiveCard");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");

async function handleMessageByText(text, config) {
  const { context } = config;
  const userId = context.activity.from.id;
  const activityData = context.activity;

  if (text.toLowerCase() === "dev") {
    const navigateCard = createAdaptiveCardFromObject(rawNavigateCard);
    await context.sendActivity({
      attachments: [navigateCard],
    });
    return;
  }

  if (text.toLowerCase() !== "hello") {
    await context.sendActivity("Did you mean to type 'hello'?");
    return;
  }

  if (text.toLowerCase() === "hello") {
    const command = await fetchMessageAdaptiveCardCommandById(userId);

    if (command.toLowerCase() === "hello") {
      await postPrimaryUserData(activityData);
    }

    let adaptiveCardData = null;
    adaptiveCardData = await findAdaptiveCard(command, adaptiveCards);

    if (!adaptiveCardData) {
      await context.sendActivity("Sorry. Did not find the necessary answer.");
      return;
    }

    if (adaptiveCardData.dynamic) {
      adaptiveCardData = await changeDataInAdaptiveCard(
        adaptiveCardData,
        activityData,
        userId
      );
    }

    await showAdaptiveCardByData(adaptiveCardData, context);
  }
}

module.exports = { handleMessageByText };
