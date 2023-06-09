const { adaptiveCards } = require("../adaptiveCards/cardIndex");
const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const changeDataInAdaptiveCard = require("../helpers/changeDataInAdaptiveCard");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");
const handleAdminCommands = require("../handlers/handleAdminCommands");
const handleAdminReplyMessages = require("../handlers/handleAdminReplyMessages");

async function handleAdminFunctions(verb, config) {
  const { context, credentials } = config;
  const contextData = context.activity;

  let adaptiveCardData = null;
  adaptiveCardData = await findAdaptiveCard(verb, adaptiveCards);

  if (!adaptiveCardData) {
    const isReplyMessage = await handleAdminReplyMessages(
      verb,
      context,
      credentials
    );
    if (!isReplyMessage) {
      await context.sendActivity("Вибачте. Не знайшов потрібної відповіді.");
      return;
    }
    await handleAdminCommands(verb, config);
    return;
  }

  await handleAdminCommands(verb, config);

  if (adaptiveCardData.dynamic) {
    const user = await handleCredentials(contextData, credentials);
    if (user) {
      adaptiveCardData = await changeDataInAdaptiveCard(
        adaptiveCardData,
        config
      );
    } else {
      const noConnectionWithDatabaseMsg =
        "Не можу дістати необхідні дані. Спробуйте пізніше.";
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
