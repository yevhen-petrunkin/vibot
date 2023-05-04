const { CardFactory } = require("botbuilder");
const getKeywordFromCard = require("./getKeywordFromCard");
const { cards } = require("../adaptiveCards/cardIndex");

function createAdaptiveCardArray() {
  const adaptiveCardArr = cards.map((card) => {
    const keyword = getKeywordFromCard(card);
    const adaptiveCard = CardFactory.adaptiveCard(card.render());
    return { keyword: keyword.toLowerCase(), card: adaptiveCard };
  });

  return adaptiveCardArr;
}

const adaptiveCardArray = createAdaptiveCardArray();

module.exports = { adaptiveCardArray };
