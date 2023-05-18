const {
  rawNavigateCard,
  adaptiveCards,
  rawSuggestAuthCard,
} = require("../adaptiveCards/cardIndex");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");
const handleCredentials = require("../handlers/handleCredentials");
const handleUserReplyMessages = require("../handlers/handleUserReplyMessages");
const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const changeDataInAdaptiveCard = require("../helpers/changeDataInAdaptiveCard");
const createAdaptiveCardFromObject = require("../helpers/createAdaptiveCardFromObject");

async function handleMessageByText(message, config) {
  const { context, credentials } = config;
  const contextData = context.activity;

  if (message.toLowerCase() === "dev") {
    const navigateCard = createAdaptiveCardFromObject(rawNavigateCard);
    await context.sendActivity({
      attachments: [navigateCard],
    });
    return;
  }

  if (message.toLowerCase() !== "hello") {
    await context.sendActivity("Did you mean to type 'hello'?");
    return;
  }

  if (message.toLowerCase() === "hello") {
    setTimeout(() => console.log("Function triggered!"), 300000);

    let command =
      credentials && credentials.stage ? credentials.stage : "hello";

    let adaptiveCardData = null;

    adaptiveCardData = await findAdaptiveCard(command, adaptiveCards);

    if (!adaptiveCardData) {
      await context.sendActivity("Sorry. Did not find the necessary answer.");
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
          "Cannot reach the necessary data right now. Try again later.";
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
