const cardTools = require("@microsoft/adaptivecards-tools");

const rawNavigateCard = require("../devNavigate.json");
const navigateCard =
  cardTools.AdaptiveCards.declareWithoutData(rawNavigateCard);

const fs = require("fs");
const path = require("path");

const adaptiveCardsPath = "./adaptiveCards/";
const adaptiveCardsRequirePath = "../adaptiveCards/";

const cards = createRawCardArray();

module.exports = {
  cards,
  navigateCard,
};

function createRawCardArray() {
  return fs
    .readdirSync(adaptiveCardsPath)
    .filter((file) => path.extname(file) === ".json")
    .map((file) => {
      const rawCard = require(path.join(adaptiveCardsRequirePath, file));
      return cardTools.AdaptiveCards.declareWithoutData(rawCard);
    });
}
