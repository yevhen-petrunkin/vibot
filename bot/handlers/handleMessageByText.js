const createAdaptiveCardArray = require("../helpers/createAdaptiveCardArray");
const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const fetchMessageAdaptiveCardCommandById = require("../db-functions/fetchMessageAdaptiveCardCommandById.js");
const postPrimaryUserData = require("../db-functions/postPrimaryUserData");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");

async function handleMessageByText(text, config) {
  const { context } = config;
  const userId = context.activity.from.id;

  if (text !== "hello") {
    await context.sendActivity("Did you mean to type 'hello'?");
    return;
  }

  if (text === "hello") {
    const adaptiveCardArray = createAdaptiveCardArray();
    const command = await fetchMessageAdaptiveCardCommandById(userId);

    if (command === "hello") {
      await postPrimaryUserData(context);
    }

    const adaptiveCardData = await findAdaptiveCard(command, adaptiveCardArray);
    await showAdaptiveCardByData(adaptiveCardData, context);
  }
}

module.exports = { handleMessageByText };
