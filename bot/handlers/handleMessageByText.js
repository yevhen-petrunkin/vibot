const { devNavigateCard } = require("../createNavigateCard");

const { adaptiveCardArray } = require("../helpers/createAdaptiveCardArray");
const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const fetchMessageAdaptiveCardCommandById = require("../db-functions/fetchMessageAdaptiveCardCommandById.js");
const postPrimaryUserData = require("../db-functions/postPrimaryUserData");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");

async function handleMessageByText(text, config) {
  const { context } = config;
  const userId = context.activity.from.id;

  if (text.toLowerCase() === "dev") {
    await context.sendActivity({
      attachments: [devNavigateCard],
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
      await postPrimaryUserData(context);
    }

    const adaptiveCardData = await findAdaptiveCard(command, adaptiveCardArray);
    await showAdaptiveCardByData(adaptiveCardData, context);
  }
}

module.exports = { handleMessageByText };
