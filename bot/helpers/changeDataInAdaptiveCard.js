async function changeDataInAdaptiveCard(adaptiveCard, config) {
  const { context, credentials } = config;
  const contextData = context.activity;
  const userName = context.activity.from.name;
  const userEmail = credentials.userEmail;

  switch (adaptiveCard.keyword.toLowerCase()) {
    // case "specMenu".toLowerCase():
    //   if (contextData.type === "invoke" || contextData.type === "message") {
    //     adaptiveCard.body[0].columns[1].items[0].altText = userName;
    //     adaptiveCard.body[0].columns[1].items[1].text = userName;
    //     adaptiveCard.body[0].columns[1].items[2].text = userEmail;
    //     return adaptiveCard;
    //   }

    // case "adminMenu".toLowerCase():
    //   if (contextData.type === "invoke" || contextData.type === "message") {
    //     adaptiveCard.body[0].item[1].columns[0].items[0].altText = userName;
    //     adaptiveCard.body[0].item[1].columns[1].items[0].text = userName;
    //     adaptiveCard.body[0].item[1].columns[1].items[1].text = userEmail;
    //     return adaptiveCard;
    //   }

    default:
      return adaptiveCard;
  }
}

module.exports = changeDataInAdaptiveCard;
