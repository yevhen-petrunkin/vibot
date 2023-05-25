const findAdaptiveCard = require("../helpers/findAdaptiveCard");
const showAdaptiveCardByData = require("./showAdaptiveCardByData");
const { adaptiveCards } = require("../adaptiveCards/cardIndex");

async function showAdaptiveCardByVerb(verb, context) {
  try {
    const adaptiveCardData = await findAdaptiveCard(verb, adaptiveCards);
    await showAdaptiveCardByData(adaptiveCardData, context);

    return;
  } catch (error) {
    console.log(error.message);
    console.log(`Cannot show adaptive card ${verb}.`);
    return;
  }
}

module.exports = showAdaptiveCardByVerb;
