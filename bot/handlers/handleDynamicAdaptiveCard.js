const { reminderTransformers } = require("../sources/reminderTransformers");

function handleDynamicAdaptiveCard(adaptiveCard, nextReminder) {
  try {
    const keyword = nextReminder.verb;

    const transformer = reminderTransformers.find(
      ({ verb }) => verb.toLowerCase() === keyword.toLowerCase()
    );

    if (!transformer) {
      return adaptiveCard;
    }

    const newBody = transformer.operation(nextReminder);

    if (newBody) {
      adaptiveCard.body = newBody;
    }

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
