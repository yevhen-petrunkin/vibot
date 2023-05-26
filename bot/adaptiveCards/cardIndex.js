const rawSuggestAuthCard = require("./suggestAuth.json");
const rawAdminMenuCard = require("./adminMenu.json");
const rawCreateCompanyCard = require("./createCompany.json");
const rawSignUpCard = require("./signUp.json");
const rawLogInCard = require("./logIn.json");
const rawSupportCard = require("./writeToSupport.json");

const fs = require("fs");
const path = require("path");

const adaptiveCardsPath = "./adaptiveCards/";
const adaptiveCardsRequirePath = "../adaptiveCards/";

const adaptiveCards = createRawCardArray();

module.exports = {
  adaptiveCards,
  rawSuggestAuthCard,
  rawSupportCard,
  rawAdminMenuCard,
  rawCreateCompanyCard,
  rawSignUpCard,
  rawLogInCard,
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
