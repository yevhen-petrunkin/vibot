const createAdaptiveCardFromObject = require("../helpers/createAdaptiveCardFromObject");

async function showAdaptiveCardByData(data, context) {
  try {
    if (!data) {
      await context.sendActivity(
        "Вибач, не знайшов потрібної відповіді. Спробуй пізніше. Для продовження набери 'Hello'"
      );
      return;
    }
    const adaptiveCard = createAdaptiveCardFromObject(data);
    await context.sendActivity({
      attachments: [adaptiveCard],
    });
  } catch (error) {
    console.log(error.message);
    console.log("Cannot show adaptive card .");
    await context.sendActivity(
      "Вибач, не знайшов потрібної відповіді. Спробуй пізніше. Для продовження набери 'Hello'"
    );
    return;
  }
}

module.exports = showAdaptiveCardByData;
