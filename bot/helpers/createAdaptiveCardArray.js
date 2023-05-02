const { CardFactory } = require("botbuilder");
const getKeywordFromCard = require("./getKeywordFromCard");
const { cards } = require("../adaptiveCards/cardIndex");

function createAdaptiveCardArray() {
  const adaptiveCardArray = cards.map((card) => {
    const keyword = getKeywordFromCard(card);
    const adaptiveCard = CardFactory.adaptiveCard(card.render());
    return { keyword, card: adaptiveCard };
  });

  return adaptiveCardArray;
}

module.exports = createAdaptiveCardArray;
