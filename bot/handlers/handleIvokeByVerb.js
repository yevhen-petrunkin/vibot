const { adaptiveCardArray } = require("../helpers/createAdaptiveCardArray");
const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const changeCommand = require("../helpers/changeCommand");
const updateUserCareerStage = require("../db-functions/updateUserCareerStage");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");
const handleInvokeAdditionalStepsByVerb = require("../handlers/handleInvokeAdditionalStepsByVerb");

async function handleInvokeByVerb(verb, config) {
  const { context } = config;
  const userId = context.activity.from.id;
  const activityData = context.activity;

  let command = changeCommand(verb, activityData);

  const adaptiveCardData = await findAdaptiveCard(command, adaptiveCardArray);

  if (adaptiveCardData) {
    await updateUserCareerStage(command, userId);
    await handleInvokeAdditionalStepsByVerb(command, activityData);
  }

  await showAdaptiveCardByData(adaptiveCardData, context);
}

module.exports = { handleInvokeByVerb };
