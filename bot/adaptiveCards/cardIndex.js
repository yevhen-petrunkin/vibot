const rawNavigateCard = require("../devNavigate.json");

const fs = require("fs");
const path = require("path");

const adaptiveCardsPath = "./adaptiveCards/";
const adaptiveCardsRequirePath = "../adaptiveCards/";

const adaptiveCards = createRawCardArray();

module.exports = {
  adaptiveCards,
  rawNavigateCard,
};

function createRawCardArray() {
  return fs
    .readdirSync(adaptiveCardsPath)
    .filter((file) => path.extname(file) === ".json")
    .map((file) => {
      const rawCard = require(path.join(adaptiveCardsRequirePath, file));
      return rawCard;
    });
}
