function defineNextVerb(verb) {
  let returnVerb = verb;
  const specMenuEndpoints = [
    "thankWaitNote",
    "perfReviewNote",
    "perfReviewNoteMessage",
    "answerToSend",
    "thankCardDef",
    "confirmRecord",
  ];
  const doesNeedTransferToSpecMenu = specMenuEndpoints.some(
    (endpoint) => verb.toLowerCase() === endpoint.toLowerCase()
  );

  if (doesNeedTransferToSpecMenu) {
    returnVerb = "specMenu";
  }

  return returnVerb;
}

module.exports = defineNextVerb;
