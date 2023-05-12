const { adaptiveCards } = require("../adaptiveCards/cardIndex");
const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const updateDataInAdminCards = require("../helpers/updateDataInAdminCards");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");
const handleAdminCommands = require("../handlers/handleAdminCommands");
const handleAdminReplyMessages = require("../handlers/handleAdminReplyMessages");

async function handleAdminFunctions(verb, config) {
  const { context, credentials } = config;
  const contextData = context.activity;

  let adaptiveCardData = null;
  adaptiveCardData = await findAdaptiveCard(verb, adaptiveCards);

  if (!adaptiveCardData) {
    const isReplyMessage = handleAdminReplyMessages(verb, context, credentials);
    if (!isReplyMessage) {
      await context.sendActivity("Sorry. Did not find the necessary answer.");
      return;
    }
    await handleAdminCommands(verb, context, credentials);
    return;
  }

  await handleAdminCommands(verb, context, credentials);

  if (adaptiveCardData.dynamic) {
    const user = await handleCredentials(contextData, credentials);
    if (user) {
      adaptiveCardData = await updateDataInAdminCards(adaptiveCardData, config);
    } else {
      const noConnectionWithDatabaseMsg =
        "Cannot reach the necessary data right now. Try again later.";
      await handleAdminReplyMessages(
        noConnectionWithDatabaseMsg,
        context,
        credentials
      );
      await showAdaptiveCardByData(rawSuggestAuthCard, context);
      return;
    }
  }

  await showAdaptiveCardByData(adaptiveCardData, context);
}

module.exports = handleAdminFunctions;
