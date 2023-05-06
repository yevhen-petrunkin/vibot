const cardTools = require("@microsoft/adaptivecards-tools");
const { CardFactory } = require("botbuilder");

function createAdaptiveCardFromObject(obj) {
  const card = cardTools.AdaptiveCards.declareWithoutData(obj);
  const adaptiveCard = CardFactory.adaptiveCard(card.render());
  return adaptiveCard;
}

module.exports = createAdaptiveCardFromObject;
