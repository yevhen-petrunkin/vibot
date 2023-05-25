const { reminderTransformers } = require("../sources/reminderTransformers");

function handleDynamicAdaptiveCard(adaptiveCard, nextReminder) {
  try {
    const keyword = nextReminder.verb;

    const transformer = reminderTransformers.find(
      ({ verb }) => verb.toLowerCase() === keyword.toLowerCase()
    );

    if (!transformer) {
      console.log(
        `handleDynamicAdaptiveCard: Did not find transformer for "${keyword}. Returning card as it is".`
      );
      return adaptiveCard;
    }

    console.log(
      "handleDynamicAdaptiveCard: reminder, verb, operation",
      nextReminder,
      transformer.verb,
      transformer.operation
    );

    const newBody = transformer.operation(nextReminder);

    if (newBody) {
      adaptiveCard.body = newBody;
    }

    console.log("handleDynamicAdaptiveCard: transformed card", adaptiveCard);

    return adaptiveCard;
  } catch (error) {
    console.log(error.message);
    console.log(
      `handleDynamicAdaptiveCard: Cannot transform dynamic adaptive card "${keyword}".`
    );
    return adaptiveCard;
  }
}

module.exports = handleDynamicAdaptiveCard;
