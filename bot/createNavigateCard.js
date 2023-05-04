const { CardFactory } = require("botbuilder");
const { navigateCard } = require("./adaptiveCards/cardIndex");

const devNavigateCard = CardFactory.adaptiveCard(navigateCard.render());

module.exports = { devNavigateCard };
