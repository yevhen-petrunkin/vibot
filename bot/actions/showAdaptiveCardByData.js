const createAdaptiveCardFromObject = require("../helpers/createAdaptiveCardFromObject");

async function showAdaptiveCardByData(data, context) {
  if (!data) {
    await context.sendActivity("Sorry. I did not find the necessary card.");
    return;
  }
  const adaptiveCard = createAdaptiveCardFromObject(data);
  await context.sendActivity({
    attachments: [adaptiveCard],
  });
}

module.exports = showAdaptiveCardByData;
