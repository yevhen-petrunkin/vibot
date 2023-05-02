const createAdaptiveCardArray = require("../helpers/createAdaptiveCardArray");
const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const updateUserCareerStage = require("../db-functions/updateUserCareerStage");
const showAdaptiveCardByData = require("../actions/showAdaptiveCardByData");
const handleInvokeAdditionalStepsByVerb = require("../handlers/handleInvokeAdditionalStepsByVerb");

async function handleInvokeByVerb(verb, config) {
  const adaptiveCardArray = createAdaptiveCardArray();
  const { context } = config;
  const userId = context.activity.from.id;
  const activityData = context.activity;
  const adaptiveCardData = await findAdaptiveCard(verb, adaptiveCardArray);

  if (adaptiveCardData) {
    await updateUserCareerStage(verb, userId);
    await handleInvokeAdditionalStepsByVerb(verb, activityData);
  }
  await showAdaptiveCardByData(adaptiveCardData, context);
}

module.exports = { handleInvokeByVerb };
