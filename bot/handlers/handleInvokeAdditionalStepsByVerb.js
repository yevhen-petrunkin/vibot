const postSecondaryUserData = require("../db-functions/postSecondaryUserData");

async function handleInvokeAdditionalStepsByVerb(verb, data) {
  switch (verb) {
    case "userData":
      await postSecondaryUserData(data);
      break;
    default:
      return;
  }
}

module.exports = handleInvokeAdditionalStepsByVerb;
