async function showAdaptiveCardByData(data, context) {
  if (!data) {
    await context.sendActivity("Sorry. I did not find the necessary card.");
    return;
  } else {
    await context.sendActivity({
      attachments: [data.card],
    });
  }
}

module.exports = showAdaptiveCardByData;
