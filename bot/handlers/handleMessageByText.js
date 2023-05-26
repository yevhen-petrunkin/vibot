const {
  adaptiveCards,
  rawSuggestAuthCard,
} = require("../adaptiveCards/cardIndex");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");
const handleCredentials = require("./handleCredentials");
const handleUserReplyMessages = require("./handleUserReplyMessages");
const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const changeDataInAdaptiveCard = require("../helpers/changeDataInAdaptiveCard");

async function handleMessageByText(message, config) {
  const { context, credentials } = config;
  const contextData = context.activity;

  if (message.toLowerCase() !== "hello") {
    await context.sendActivity("Ти хотів написати 'hello'?");
    return;
  }

  if (message.toLowerCase() === "hello") {
    let command =
      credentials && credentials.stage ? credentials.stage : "hello";

    let adaptiveCardData = null;

    adaptiveCardData = await findAdaptiveCard(command, adaptiveCards);

    if (!adaptiveCardData) {
      await context.sendActivity("Вибачте. Не знайшов потрібної відповіді.");
      return;
    }

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
        await handleUserReplyMessages(
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
}

module.exports = handleMessageByText;
