const adminMenuTransformer = require("../helpers/adminMenuTransformer");

async function updateDataInAdminCards(adaptiveCard, config) {
  const { context, credentials } = config;

  let data = adaptiveCard;

  switch (adaptiveCard.keyword.toLowerCase()) {
    case "adminMenu".toLowerCase():
      data = adminMenuTransformer(adaptiveCard, config);
      break;
  }
  return data;
}

module.exports = updateDataInAdminCards;
