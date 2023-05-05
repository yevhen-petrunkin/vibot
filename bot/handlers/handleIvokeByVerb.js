const { adaptiveCards } = require("../adaptiveCards/cardIndex");
const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const changeCommand = require("../helpers/changeCommand");
const updateUserCareerStage = require("../db-functions/updateUserCareerStage");
const changeDataInAdaptiveCard = require("../helpers/changeDataInAdaptiveCard");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");
const handleInvokeAdditionalStepsByVerb = require("../handlers/handleInvokeAdditionalStepsByVerb");

async function handleInvokeByVerb(verb, config) {
  const { context } = config;
  const userId = context.activity.from.id;
  const activityData = context.activity;

  let command = await changeCommand(verb, activityData);

  let adaptiveCardData = null;
  adaptiveCardData = await findAdaptiveCard(command, adaptiveCards);

  if (!adaptiveCardData) {
    await context.sendActivity("Sorry. Did not find the necessary answer.");
    return;
  }

  if (adaptiveCardData) {
    await updateUserCareerStage(command, userId);
    await handleInvokeAdditionalStepsByVerb(command, activityData);
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

module.exports = { handleInvokeByVerb };
