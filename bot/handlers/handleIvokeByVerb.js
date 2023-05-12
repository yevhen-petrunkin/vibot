const {
  adaptiveCards,
  rawSuggestAuthCard,
} = require("../adaptiveCards/cardIndex");

const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const changeCommand = require("../helpers/changeCommand");
const changeDataInAdaptiveCard = require("../helpers/changeDataInAdaptiveCard");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");
const handleUserReplyMessages = require("../handlers/handleUserReplyMessages");
const handleInvokeAdditionalStepsByVerb = require("../handlers/handleInvokeAdditionalStepsByVerb");
const updateUserCareerStageByEmail = require("../db-functions/updateUserCareerStageByEmail");

async function handleInvokeByVerb(verb, config) {
  const { context, credentials } = config;
  const contextData = context.activity;
  const { userEmail, companyName } = credentials;

  let command = await changeCommand(verb, config);

  let adaptiveCardData = null;
  adaptiveCardData = await findAdaptiveCard(command, adaptiveCards);

  if (!adaptiveCardData) {
    const isReplyMessage = handleUserReplyMessages(verb, context, credentials);
    if (!isReplyMessage) {
      await context.sendActivity("Sorry. Did not find the necessary answer.");
      return;
    }
    await handleInvokeAdditionalStepsByVerb(command, contextData);
    return;
  }

  await handleInvokeAdditionalStepsByVerb(command, contextData);

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

  if (adaptiveCardData.shouldCareerUpdate) {
    await updateUserCareerStageByEmail(userEmail, command, companyName);
  }

  await showAdaptiveCardByData(adaptiveCardData, context);
}

module.exports = handleInvokeByVerb;
